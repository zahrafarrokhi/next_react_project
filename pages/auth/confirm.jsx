import React, { useState, useRef, useEffect } from 'react';
import Layout from '../../components/Layout';
const confirm = (props) => {

  return(
  
    <div className="d-flex flex-column">
      لطفا کد ارسال شده به شماره
    </div>
  
  )
}
confirm.getLayout = (page) => (
  <Layout backLink>{page}</Layout>
);
export default confirm;