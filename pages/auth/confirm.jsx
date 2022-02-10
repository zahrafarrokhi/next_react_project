import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import VerificationInput from 'react-verification-input';
import { authSlice, confirm, requestMobileOTP } from '../../lib/slices/auth';
import styles from '../../styles/Confirm.module.scss'
import { persianToEnglishDigits } from '../../lib/utils';
import { useRouter } from 'next/dist/client/router';
import { GrRefresh } from 'react-icons/gr';

const CODE_LENGTH = 4;
const EXP_TIME = 120;

const Confirm = (props) => {
  

  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const username = useSelector((state)=>state?.authReducer?.username);
  const method = useSelector((state) => state?.authReducer?.method);
  const dispatch = useDispatch();
  const router = useRouter();
  const [time, setTime] = useState(EXP_TIME);
  const timerRef = useRef(null);

  const submit = async () => {
    try {
      console.log(code);
      await dispatch(
        confirm({ method, token: code, [method]: username }),
      ).unwrap();
      router.push('/patients/');
    } catch (e) {
      setError(true);
    }
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const timerInterval = setInterval(() => {
      if (time > 0) setTime((t) => (t > 0 ? t - 1 : t));
      else clearInterval(timerRef.current);
    }, 1000);
    timerRef.current = timerInterval;
  };

  useEffect(() => {
    if (!method || !username) {
      router.push('/auth/login');
      return;
    }
//open page =>rendering page on mount
    startTimer();
// close page =>on unmount
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const resendCode = async () => {
    if (time > 0) return;
    try {
      await dispatch(requestMobileOTP(username)).unwrap();
      console.log("Resending", time)
      setTime(EXP_TIME);
      // startTimer();
    } catch (e) {
      setError(true);
    }
  };

  return(
 
    <div className="d-flex flex-column">
         <div className={` d-flex flex-column justify-content-center align-items-center ${styles.titlephone}`}>
            لطفا کد ارسال شده به شماره
            <div className={`d-flex flex-row justify-content-center align-items-center  ${styles.phone_num}`}>
              {username}
            </div>
            <div className={`d-flex flex-row justify-content-center align-items-center ${styles.titlephone}`}>
              وارد نمایید
            </div>
          </div>
          <div className="d-flex flex-column justify-content-start align-items-center">
          <div className={`align-self-start ${styles.confirm_code}`}>
            کد تأیید را وارد کنید
          </div>
          <VerificationInput
           length={CODE_LENGTH}
           placeholder=""
           validChars="0-9۰-۹"
           removeDefaultStyles
           autoFocus
           dir="ltr"
           onChange={(text) => setCode(persianToEnglishDigits(text))}
           classNames={{
            container: `d-flex flex-row justify-content-center ${styles.codecontainer}`,
            character: `rounded m-1 form-control ${styles.inpsingle}`,
            characterInactive: `rounded m-1 form-control ${styles.inpsingle} ${styles.inpsingleina}`,
            characterSelected: `rounded m-1 form-control:focus form-control:active ${styles.inpsingle} ${styles.inpsinglesel}`,
          }}
            />
            <button
              className={`btn btn-primary ${styles.btn}`}
              onClick={submit}
              disabled={time ===0 || code.length !== 4}
            >
              ادامه
  
            </button>
          </div>
          <div className={`p-2 d-flex   d-column justify-content-between ${styles.refreshcnt}`}>
          <div
             className={`d-flex  ${styles.resendcode}`}
             onClick={resendCode}
             disabled={time !== 0}
          >
            ارسال مجدد
          </div>
          <div className="d-flex ">
            <GrRefresh className={`${styles.refresh}`} />
           {/* padStart -> Add padding to string : 4->04, 0->00, 12->12 */}
           {/* min:second */}
            {String(Math.floor(time / 60)).padStart(2, '0')}
            :
            {String(time % 60).padStart(2, '0')}
          </div>
        </div>
    

    </div>
 
  );
}
Confirm.getLayout = (page) => (
  <Layout backLink>{page}</Layout>
);
export default Confirm;