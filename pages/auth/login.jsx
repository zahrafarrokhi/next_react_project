import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Layout from '../../components/Layout';
import { requestMobileOTP } from '../../lib/slices/auth';
import { persianToEnglishDigits } from '../../lib/utils';
import styles from '../../styles/Login.module.scss';

function login() {

  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [errorStr, setErrorStr] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const redErr = useSelector((state) => state.authReducer?.error);
  const validate = () => /^09\d{9}$/g.test(value);

  const submit = async () => {
    if (validate()) {
      setError('');
      try {
        await dispatch(requestMobileOTP(value)).unwrap();

        router.push('/auth/confirm');
      } catch (e) {
        setError(true);
      }
    } else {
      setErrorStr('لطفا فیلد‌ها رادرست پر نمایید');
    }
  };

  return(
    <div className={`d-flex flex-column ${styles.cnt}`}>
     <div className="d-flex flex-column">
       <div className={`w-100 ${styles.loginlabel}`}>
         <label htmlFor="">ورود / ثبت نام</label>
       </div>
       <div className={`d-flex d-row ${styles.phonecnt}`}>
         <input type="text" placeholder="شماره موبایل" className={`form-control `} value={value} onChange={(e) => setValue(persianToEnglishDigits(e.target.value))} /></div>
         <div className={`w-100 `}>
         <button className={`btn btn-primary w-100 ${styles.loginbtn} `} onClick={submit}>ورود</button>
        </div>
     </div>
     </div>
  )
}
login.getLayout = (page) => (
  <Layout>{page}</Layout>
);

export default login;