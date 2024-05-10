import React from 'react';
import { useTranslation } from 'react-i18next'; // Importing useTranslation hook
import { NavLink } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import "./Footer.css";

const Footer = () => {
    const { t } = useTranslation(); // Using useTranslation hook to access translations

    return (
        <footer className="new_footer_area bg_color">
            <div className="new_footer_top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="f_widget company_widget">
                                <h3 className="f-title-1 f_600 t_color f_size_18">{t('en.Get in Touch')}</h3>
                                <p>{t('en.Don’t miss any updates of our new updates.!')}</p>
                                <form action="#" className="f_subscribe_two mailchimp" method="post" noValidate>
                                    <input type="text" name="EMAIL" className="form-control memail" placeholder="Email" />
                                    <button className="btn btn_get btn_get_two" type="submit">Subscribe</button>
                                    <p className="mchimp-errmessage" style={{ display: 'none' }}></p>
                                    <p className="mchimp-sucmessage" style={{ display: 'none' }}></p>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="f_widget about-widget pl_70">
                                <h3 className="f-title-2 f_800 t_color f_size_18">{t('Company')}</h3>
                                <ul className="list-unstyled f_list">
                                    <li><a href="#">{t('en.About')}</a></li>
                                    <li><a href="#">{t('en.Blog')}</a></li>
                                    <li><a href="#">{t('en.Android App')}</a></li>
                                    <li><a href="#">iOS App</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="f_widget about-widget pl_70">
                                <h3 className="f-title-3 f_600 t_color f_size_18">{t('en.Help')}</h3>
                                <ul className="list-unstyled f_list">
                                    <li><a href="#">{t('en.FAQ')}</a></li>
                                    <li><a href="#">{t('en.Term & conditions')}</a></li>
                                    <NavLink to="/contact"> <li><a href="#">Contact US</a></li></NavLink>
                                    <li><a href="#">{t('en.Support Policy')}</a></li>
                                    <li><a href="#">{t('en.Privacy')}</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="f_widget social-widget pl_70">
                                <h3 className="f-title-4 f_600 t_color f_size_18">{t('Follow')}</h3>
                                <div className="f_social_icon">
                                    <a href="#" className="fab fa-facebook"> <FaFacebook/></a>
                                    <a href="#" className="fab fa-twitter"><RiTwitterXFill /></a>
                                    <a href="#" className="fab fa-linkedin"><FaLinkedin/></a>
                                    <a href="#" className="fab fa-pinterest"><FaInstagram/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer_bg">
                    <div className="footer_bg_one"></div>
                    <div className="footer_bg_two"></div>
                </div>
            </div>
            <div className="footer_bottom">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-sm-7">
                            <p className="mb-0 f_400">{t('en.© SkillUp India Inc.. 2024 All rights reserved.')}</p>
                        </div>
                        <div className="col-lg-6 col-sm-5 text-right">
                            <p>{t('en.Made in 🇮🇳')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
