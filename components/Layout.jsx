import React, { Children } from "react";
import styles from '../styles/Layout.module.scss';
import { IoChevronBackCircleOutline } from 'react-icons/io5';

const Layout = (props)=>{
  const {children,backLink} = props; // const children = props.children
  return(
    <div className={`d-flex flex-row justify-content-center align-items-center ${styles.cnt} `}>
      <div className={`d-flex flex-column justify-content-center align-items-center align-self-stretch ${styles.cnt_init}`}>
      <IoChevronBackCircleOutline className={backLink ? styles.back_link : 'd-none'}/>
      {children}
      </div>

    
    </div>
  )

}
export default Layout;