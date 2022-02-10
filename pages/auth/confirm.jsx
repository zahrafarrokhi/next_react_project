import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import VerificationInput from 'react-verification-input';
import { authSlice, confirm } from '../../lib/slices/auth';
import styles from '../../styles/Confirm.module.scss'
import { persianToEnglishDigits } from '../../lib/utils';
import { useRouter } from 'next/dist/client/router';


const Confirm = (props) => {
  const CODE_LENGTH = 4;
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const username = useSelector((state)=>state?.authReducer?.username);
  const method = useSelector((state) => state?.authReducer?.method);
  const dispatch = useDispatch();
  const router = useRouter();

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
              disabled={code.length !== 4}
            >
              ادامه
  
            </button>
          </div>

    </div>
 
  );
}
Confirm.getLayout = (page) => (
  <Layout backLink>{page}</Layout>
);
export default Confirm;