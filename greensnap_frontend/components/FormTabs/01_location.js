import styles from '@/styles/report.module.css'
import dynamic from 'next/dynamic'
import React from 'react'

import { useState, useEffect } from 'react'

export default function LocationTab({ formData, setFormData })
{
    const [localizationType, setLocalizationType] = React.useState(null);

    const handleSelect = (e) => {
        e.stopPropagation();
        var sections = document.getElementsByClassName('localization_section');
        for(var i = 0; i < sections.length; i++)
        {
            if(!sections[i].className.includes(e.target.id))
            {
                sections[i].style.display = 'none';
            }else
            {
                sections[i].style.display = 'block';
            }
        }

        setLocalizationType(e.target.value);
        
        setFormData({
            ...formData,
            localizationType: e.target.value,
        });

    }

    const Map = React.useMemo(() => dynamic(
        () => import('@/components/Map'), // replace '@components/map' with your component's location
        { 
          loading: () => <p>A map is loading</p>,
          ssr: false // This line is important. It's what prevents server-side render
        }
      ), [localizationType])

    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setLoggedIn] = useState(false);
    
    useEffect(() => {
        fetch('/api/get-user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }})
            .then((res) => res.json())
            .then((data) => {
                if(data.message === "Unauthorized")
                {
                    setLoggedIn(false);
                    return;
                }
                setUserData(data);
                setLoggedIn(true);

                
            })
    },[]);

    

    return (
        <div className={`${styles.formTab} formTab`}>
            <h2 className={styles.formTabHeader}>DEINEN STANDORT BESTIMMEN</h2>

            <div className={styles.formTabContent}>
                <div className={styles.formTabContentSection}>
                    

                    { isLoggedIn ? 
                        (
                            <></>
                        )

                        :

                        (
                            <>
                                <h3 className={styles.formContentHeader}>WIE HEISST DU?</h3>
                                <input 
                                    type="text" 
                                    name="firstName" 
                                    id="firstName" 
                                    placeholder="MAX MUSTERMANN"
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            firstName: e.target.value,
                                        });
                                    }}
                                    value={formData.firstName}/>
                            </>
                        )
                    }
                </div>

                <div className={styles.formTabContentSection}>
                    <h3 className={styles.formContentHeader}>WIE SOLL DEIN STANDORT BESTIMMT WERDEN?</h3>
                    {/* https://codepen.io/jacobberglund/pen/mdPEza */}
                    <div className={`${styles.formContentRow} ${styles.formContentRadio}`}>
                        <input 
                            type="radio" 
                            name="localizationType" 
                            id="localization_gps" 
                            value="gps"
                            onChange={handleSelect}/>
                        <label htmlFor="localization_gps">GPS</label>

                        <input 
                            type="radio" 
                            name="localizationType" 
                            id="localization_manual" 
                            value="manuell"
                            onChange={handleSelect}/>
                        <label htmlFor="localization_manual">MANUELL</label>
                    </div>
                </div>

                <div className={`${styles.formTabContentSection} ${styles.localizationSection} localization_section localization_manual_section`}>
                    <h3 className={styles.formContentHeader}>STRASSE, HAUSNUMMER</h3>
                    <div className={styles.formContentRow}>
                        <input 
                            type="text" 
                            name="street" 
                            id="street" 
                            placeholder="MUSTERSTRASSE"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    street: e.target.value,
                                });
                            }}
                            value={formData.street}/>
                        <input className={styles.flex0_5}
                            type="text" 
                            name="streetNumber" 
                            id="streetNumber" 
                            placeholder="42"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    streetNumber: e.target.value,
                                });
                            }}
                            value={formData.streetNumber}/>
                    </div>
                </div>

                <div className={`${styles.formTabContentSection} ${styles.localizationSection} localization_section localization_manual_section`}>
                    <h3 className={styles.formContentHeader}>ORT, POSTLEITZAHL</h3>
                    <div className={styles.formContentRow}>
                        <input 
                            type="text" 
                            name="city" 
                            id="city" 
                            placeholder="MUSTERHAUSEN"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    city: e.target.value,
                                });
                            }}
                            value={formData.city}/>
                        <input 
                            type="text" 
                            name="postalCode" 
                            id="postalCode" 
                            placeholder="54321"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    postalCode: e.target.value,
                                });
                            }}
                            value={formData.postalCode}/>
                    </div>
                </div>

                <div className={`${styles.formTabContentSection} ${styles.localizationSection} localization_section localization_gps_section`}>
                    <Map formData={formData} setFormData={setFormData}/>
                </div>
            </div>
        </div>
    )
}