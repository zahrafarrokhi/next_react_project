import React, { Children } from "react";
import styles from '../styles/Layout.module.scss';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { useRouter } from 'next/dist/client/router';

const Layout = (props)=>{
  const {children,backLink} = props; // const children = props.children
  const router = useRouter();
  
  return(
    <div className={`d-flex flex-row justify-content-center align-items-center ${styles.cnt} `}>
      <div className={`d-flex flex-column justify-content-center align-items-center align-self-stretch ${styles.cnt_init}`}>
        {/* <IoChevronBackCircleOutline className={backLink ? styles.back_link : 'd-none'}/> */}
        {backLink && <IoChevronBackCircleOutline className={styles.back_link} onClick={() => { router.back(); }}/> }
        {children}
      </div>

    
    </div>
  )

}
export default Layout;