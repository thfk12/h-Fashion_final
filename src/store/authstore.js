import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { create } from 'zustand';
import { auth, googleProvider, db } from '../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const useAuthStore = create((set) => ({
  user: null,
  items: [],
  // onMember: async ({ id, displayName, email, password, phone, address, address2, formData }) => {
  //   try {
  //     const email = formData.email.trim();
  //     const password = formData.password.trim();

  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;

  //     await updateProfile(user, { displayName });

  //     await setDoc(doc(db, 'users', user.uid), {
  //       id,
  //       displayName,
  //       email,
  //       phone,
  //       address,
  //       address2,
  //     });

  //     set({
  //       user: { id, displayName, email, phone, address, address2 },
  //     });
  //     alert('회원가입 성공');
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // },
  onMember: async (formData) => {
  try {
    const {
      id,
      displayName,
      email,
      password,
      phone,
      address,
      address2,
    } = formData;

    const e = (email || "").trim();
    const p = (password || "").trim();

    const userCredential = await createUserWithEmailAndPassword(auth, e, p);
    const user = userCredential.user;

    // displayName 설정(선택)
    if (displayName) {
      await updateProfile(user, { displayName });
    }

    await setDoc(doc(db, "users", user.uid), {
      id,
      displayName,
      email: e,
      phone,
      address,
      address2,
    });

    set({
      user: { id, displayName, email: e, phone, address, address2 },
    });

    return user; // ✅ 성공 반환
  } catch (err) {
    console.error(err);
    throw err; // ✅ 실패를 Join에서 잡게 throw
  }
},


  nonCart: {
    items: [],
    totalPrice: 0,
  },

  setNoncart: (data) =>
    set({
      nonCart: {
        items: data.items || [],
        totalPrice: data.totalPrice || 0,
      },
    }),

  clearNonCart: () =>
    set({
      nonCart: { items: [], totalPrice: 0 },
    }),
  nuser: null,

  onNMember: async ({ oname, ophone, oemail, opassword, opasswordcheck }) => {
    try {
      await setDoc(doc(db, 'nuser', ophone), {
        oname,
        ophone,
        oemail,
        opassword,
        opasswordcheck,
      });
      set({
        nuser: { oname, ophone, oemail, opassword, opasswordcheck },
      });

      console.log('nuser데이터정보', {
        oname,
        ophone,
        oemail,
        opassword,
        opasswordcheck,
      });
    } catch (err) {
      alert(err.message);
    }
  },

  naddress: null,
  onNAddress: async ({ nname, nphone, naddress, naddress2, nrequest }) => {
    try {
      await setDoc(doc(db, 'naddress', nname), {
        nname,
        nphone,
        naddress,
        naddress2,
        nrequest,
      });
      set({
        naddress: { nname, nphone, naddress, naddress2, nrequest },
      });

      console.log('nuser주소정보', {
        nname,
        nphone,
        naddress,
        naddress2,
        nrequest,
      });
    } catch (err) {
      alert(err.message);
    }
  },

  // 로그인
  onLogin: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const fbUser = userCredential.user;

      const userRef = doc(db, 'users', fbUser.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        set({
          user: {
            uid: fbUser.uid,
            ...userDoc.data(),
          },
        });
      }

      alert('로그인 성공!');
    } catch (err) {
      // alert(err.message);
      console.log("LOGIN ERROR:", err?.code, err?.message);
      throw err;
    }
  },

  onGoogleLogin: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;
      const userRef = doc(db, 'users', user.uid);

      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        const userInfo = {
          email: user.email,
          name: user.displayName,
          uid: user.uid,
          nickname: user.displayName,
        };

        await setDoc(userRef, userInfo);
        set({ user: userInfo });
      } else {
        set({ user: userDoc.data() });
      }
    } catch (err) {
      alert(err.message);
    }
  },

  onKakaoLogin: async (navigate) => {
    try {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init('f96a0329a41a03cdd11afad027e1fbec');
        console.log(' Kakao SDK 초기화 완료');
      }

      const authObj = await new Promise((resolve, reject) => {
        window.Kakao.Auth.login({
          scope: 'profile_nickname, profile_image',
          success: resolve,
          fail: reject,
        });
      });
      console.log(' 카카오 로그인 성공:', authObj);

      // 3 사용자 정보 요청 (Promise 기반)
      const res = await window.Kakao.API.request({
        url: '/v2/user/me',
      });
      console.log(' 카카오 사용자 정보:', res);

      const uid = res.id.toString();
      const kakaoUser = {
        uid,
        email: res.kakao_account?.email || '',
        name: res.kakao_account.profile?.nickname || '카카오사용자',
        nickname: res.kakao_account.profile?.nickname || '카카오사용자',
        photoURL: res.kakao_account.profile?.profile_image_url || '',
        provider: 'kakao',
        createdAt: new Date(),
      };

      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, kakaoUser);
        console.log(' 신규 카카오 회원 Firestore에 등록 완료');
      } else {
        console.log('기존 카카오 회원 Firestore 데이터 있음');
      }

      set({ user: kakaoUser });

      alert(`${kakaoUser.nickname}님, 카카오 로그인 성공! `);
      if (navigate) navigate('/');
    } catch (err) {
      console.error(' 카카오 로그인 중 오류:', err);
      alert('카카오 로그인 실패: ' + err.message);
    }
  },
  onLogout: async () => {
    await signOut(auth);
    set({ user: null });
  },

  initAuth: () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          set({ user: userDoc.data() });
        } else {
          set({
            user: {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
            },
          });
        }
      } else {
        set({ user: null });
      }
    });
  },
}));
