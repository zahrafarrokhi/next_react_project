import React from "react";
import Layout from '../../components/Layout';
import styles from '../../styles/Login.module.scss';

function login() {

  return(
    <div className={`d-flex flex-column ${styles.cnt}`}>
     <div className="d-flex flex-column">
       <div className={`w-100 ${styles.loginlabel}`}>

         <label htmlFor="">ورود / ثبت نام</label>
       </div>
       <div className={`d-flex d-row ${styles.phonecnt}`}>
         <input type="text" placeholder="شماره موبایل" className={`form-control `}/></div>
         <div className={`w-100 `}>
          <button className={`btn btn-primary w-100 ${styles.loginbtn} `}>ورود</button>
        </div>
     </div>
  
    </div>
  )
}
login.getLayout = (page) => (
  <Layout>{page}</Layout>
);

export default login;