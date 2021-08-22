import React from 'react'

const Footer = (props) =>  {
let body = '';
    body=(
     
   <>
    
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
           {/* <ul class="footer-links"> */}
              {/* <a href="http://scanfcode.com/about/">About Us</a>
              <a href="http://scanfcode.com/contact/">Contact Us</a>
              <a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a>
              <a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a>
              <a href="http://scanfcode.com/sitemap/">Sitemap</a> */}
            {/* </ul> */}
            <p class="copyright-text">Make a Quiz®2021 by Zeliha KONAK
        
            </p>
            
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
              <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
              <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
              
              <li><a class="linkedin" href="#"><i class="fa fa-linkedin"></i></a></li>   
            </ul> 
          </div>
        </div>
      </div>
</>
    )
    return(<footer className="site-footer">{body}</footer>)

    
}
export default Footer;