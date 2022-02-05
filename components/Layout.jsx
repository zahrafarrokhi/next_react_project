import React, { Children } from "react";
import styles from '../styles/Layout.module.scss'

const Layout = (props)=>{
  const {children} = props;
  return(
    <div className={`d-flex flex-row justify-content-center align-items-center ${styles.cnt} `}>
      <div className={`d-flex flex-column justify-content-center align-items-center ${styles.cnt_init}`}>
      {children}
      </div>

    
    </div>
  )

}
export default Layout;