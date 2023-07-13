"use client"

import styles from '@/styles/report.module.css'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'


export default function Report()
{

    return (
        <main className={styles.main}>
            {/* https://www.w3schools.com/howto/howto_js_form_steps.asp */}
            <form className={`${styles.itemForm} itemForm`} action="">
                <div className={styles.formHeader}>
                    <h1>MUELL MELDEN</h1>
                    <div className={styles.formProgressBar}></div>
                    <div className={styles.formProgressText}>SCHRITT 1/3</div>
                </div>

                <div className={`${styles.formTab} formTab`}>
                    <h2 className={styles.formTabHeader}>DEINEN STANDORT BESTIMMEN</h2>

                    <div className={styles.formTabContent}>
                        <div className={styles.formTabContentSection}>
                            <h3 className={styles.formContentHeader}>WIE HEISST DU?</h3>
                            <input type="text" name="firstName" id="firstName" placeholder="MAX MUSTERMANN"/>
                        </div>

                        <div className={styles.formTabContentSection}>
                            <h3 className={styles.formContentHeader}>WIE SOLL DEIN STANDORT BESTIMMT WERDEN?</h3>
                            {/* https://codepen.io/jacobberglund/pen/mdPEza */}
                            <div className={styles.formContentRow}>
                                <input type="radio" name="localizationType" id="localization_gps" value="gps"/>
                                <label htmlFor="localization_gps">GPS</label>

                                <input type="radio" name="localizationType" id="localization_manual" value="manuell"/>
                                <label htmlFor="localization_manual">MANUELL</label>
                            </div>
                        </div>

                        <div className={styles.formTabContentSection} id="localization_manual_section">
                            <h3 className={styles.formContentHeader}>STRASSE, HAUSNUMMER</h3>
                            <div className={styles.formContentRow}>
                                <input type="text" name="street" id="street" placeholder="MUSTERSTRASSE"/>
                                <input type="text" name="house_number" id="house_number" placeholder="42"/>
                            </div>
                        </div>

                        <div className={styles.formTabContentSection} id="localization_manual_section">
                            <h3 className={styles.formContentHeader}>ORT, POSTLEITZAHL</h3>
                            <div className={styles.formContentRow}>
                                <input type="text" name="place" id="place" placeholder="MUSTERHAUSEN"/>
                                <input type="text" name="plz" id="plz" placeholder="54321"/>
                            </div>
                        </div>

                        <div className={styles.formTabContentSection} id="localization_gps_section">
                            <div className={styles.formGPSPlaceholder}></div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.formTab} formTab`}>
                    <h2 className={styles.formTabHeader}>DEINEN FUND BESCHREIBEN</h2>

                    <div className={styles.formTabContent}>
                        <div className={styles.formTabContentSection}>
                            <h3 className={styles.formContentHeader}>ART DES FUNDS</h3>
                            <input type="dropdown" name="item_type" id="item_type" placeholder="ALTGLAS"/>
                        </div>

                        <div className={styles.formTabContentSection}>
                            <h3 className={styles.formContentHeader}>GROESSE (IN CM)</h3>
                            <input type="number" name="item_size" id="item_size" default="50"/>
                        </div>

                        <div className={styles.formTabContentSection}>
                            <h3 className={styles.formContentHeader}>BILD DES FUNDS</h3>
                            <input type="file" name="item_picture" id="item_picture"/>
                        </div>
                    </div>
                </div>

                <div className={`${styles.formTab} formTab`}>
                    <h2 className={styles.formTabHeader}>ÜBERBLICK</h2>

                    <div className={styles.formTabContent}>
                        <div className={styles.formTabContentSection}>
                            <h3 className={styles.formContentHeader}>ZUSTAENDIGE BEHOERDE</h3>
                            <input type="text" name="summary_service_name" id="summary_service_name" placeholder="ORDNUNGSAMT MUSTERHAUSEN" readOnly/>
                            <input type="text" name="summary_service_phone" id="summary_service_phone" placeholder="+49 1234 5678910" readOnly/>
                            <input type="text" name="summary_service_email" id="summary_service_email" placeholder="ordnungsamt@musterhausen.de" readOnly/>
                            <div className={styles.formContentSubtext}>FEHLER KOENNEN <Link href="#">HIER</Link> GEMELDET WERDEN.</div>
                        </div>

                        <div className={styles.formTabContentSection}>
                            <h3 className={styles.formContentHeader}>FUND</h3>
                            <input type="text" name="summary_item_type" id="summary_item_type" placeholder="ALTGLAS" readOnly/>
                            <input type="text" name="summary_item_size" id="summary_item_size" placeholder="50 CM" readOnly/>
                            <input type="text" name="summary_item_place" id="summary_item_place" placeholder="MUSTERHAUSEN" readOnly/>
                        </div>
                    </div>
                </div>

                <div className={styles.formNavigation}>
                    <button type="button" className={styles.formNavigationButton} id="formNavigationButtonBack">ZURÜCK</button>
                    <button type="button" className={styles.formNavigationButton} id="formNavigationButtonNext">WEITER</button>
                </div>
            </form>

        </main>
    )
}