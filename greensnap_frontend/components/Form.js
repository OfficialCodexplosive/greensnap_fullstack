import styles from '@/styles/report.module.css'
import LocationTab from '@/components/FormTabs/01_location'
import DescriptionTab from '@/components/FormTabs/02_description'
import SummaryTab from '@/components/FormTabs/03_summary'
import { useState } from 'react'

{/* https://blog.logrocket.com/build-multi-step-form-usestate-hook/ */}
export default function Form()
{
    const [page, setPage] = useState(0);
    const [submitMessage, setSubmitMessage] = useState(null);

    const [formData, setFormData] = useState({
        firstName : "",
        localizationType : "",
        street : "",
        streetNumber : "",
        postalCode : "",
        city : "",
        typeOfItem : "",
        sizeOfItem : "",
        pictureOfItem : "",
        latitude : null,
        longitude : null
    });

    const conditionalFormComponent = () => {
        switch (page) 
        {
            case 0:
                return <LocationTab formData={formData} setFormData={setFormData} />;
            case 1:
                return <DescriptionTab formData={formData} setFormData={setFormData} />;
            case 2:
                return <SummaryTab formData={formData} setFormData={setFormData} />;
            default:
                return <LocationTab formData={formData} setFormData={setFormData} />;
        }

    }

    const handleSubmit = async (e) => 
    {
        e.stopPropagation();
        e.preventDefault();

        if(page === 0)
        {
            try
            {
                if(formData.localizationType === "manuell")
                {
                    const coordinateData = {
                        street : formData.street, 
                        streetNumber : formData.streetNumber, 
                        postalCode : formData.postalCode, 
                        city : formData.city, 
                        localizationType : formData.localizationType
                    }

                    triggerLoadingAnimation();
    
                    const res = await fetch('/api/get-coordinates', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(coordinateData)
                    });
                    
                    const data = await res.json();

                    untriggerLoadingAnimation();
                    
    
                    if(!data.precise)
                    {
                        setSubmitMessage("Koordinaten konnten nicht bestimmt werden. Bitte bestimme den genauen Standort über die Karte. Deine Standortdaten werden nicht erhoben.");
                        triggerAnimation();
                        return;
                    }
                    setFormData({
                        ...formData, 
                        latitude : data.lat, 
                        longitude : data.lng});
                    
                    if( res.status === 200 )
                    {
                        console.log("Queried coordinates");
                        console.log(data);
                    }
                }else if (formData.localizationType === "gps") 
                {
                    if (formData.latitude === null || formData.longitude === null)
                    {
                        setSubmitMessage("Koordinaten konnten nicht bestimmt werden. Bitte bestimme den Standort manuell. Deine Standortdaten werden nicht erhoben.");
                        triggerAnimation();
                        return;
                    }

                    const geoData = {
                        lat : formData.latitude, 
                        lon : formData.longitude
                    }

                    triggerLoadingAnimation();
    
                    const res = await fetch('/api/get-address', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(geoData)
                    });
                    
                    const data = await res.json();

                    untriggerLoadingAnimation();
                    
                    /* 
                    if(!data.precise)
                    {
                        setSubmitMessage("Koordinaten konnten nicht bestimmt werden. Bitte bestimme den genauen Standort über die Karte. Deine Standortdaten werden nicht erhoben.");
                        triggerAnimation();
                        return;
                    }
                    setFormData({
                        ...formData, 
                        street : data.street, 
                        streetNumber : data.streetNumber, 
                        postalCode : data.postalCode, 
                        city : data.city, 
                        localizationType : data.localizationType});
                    
                    if( res.status === 200 )
                    {
                        console.log("Queried coordinates");
                        console.log(data);
                    }*/
                } else if (formData.localizationType === "") {
                    setSubmitMessage("Standort kann nicht bestimmt werden. Bitte wähle eine Methode aus.");
                    triggerAnimation();
                    return;
                }else
                {
                    if (formData.latitude === null || formData.longitude === null)
                    {
                        setSubmitMessage("Standort konnte nicht bestimmt werden.");
                        triggerAnimation();
                        return;
                    }
                }
            }
            catch(err)
            {
                console.error(err)
            }
        }

        if(page === 1)
        {
            try
            {
                if(formData.typeOfItem === "" || formData.typeOfItem === null)
                {
                    setSubmitMessage("Wähle die Kategorie aus, die am besten zu deinem Fund passt.");
                    triggerAnimation();
                    return;
                }
                if(formData.sizeOfItem === "" || formData.sizeOfItem === null)
                {
                    setSubmitMessage("Gib eine geschätzte Größe für deinen Fund an.");
                    triggerAnimation();
                    return;
                }
            }
            catch(err)
            {
                console.error(err)
            }
        }
        
        if(page === 2)
        {
            try
            {
                const nextSpinner = document.getElementById("spinner");
                nextSpinner.classList.add(styles.white);
                triggerLoadingAnimation();

                const res = await fetch('/api/post-item', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const data = await res.json();

                untriggerLoadingAnimation();
                nextSpinner.classList.remove(styles.white);

                setSubmitMessage(res.status);
                triggerAnimation();
                
                if( res.status === 200 )
                {
                    console.log("Item successfully posted");
                    console.log(data);
                }
            }
            catch(err)
            {
                console.error(err)
            }
        }else{
            setPage(page + 1);
        }
    }

    const triggerAnimation = () => {
        const message = document.getElementById("submitMessage");
        message.classList.add(styles.animate);
        setTimeout(() => {
            message.classList.remove(styles.animate);
        }, 10000);
    }

    const triggerLoadingAnimation = () => 
    {
        const nextSpinner = document.getElementById("spinner");
        nextSpinner.classList.add(styles.load);
    }

    const untriggerLoadingAnimation = () => 
    {
        const nextSpinner = document.getElementById("spinner");
        nextSpinner.classList.remove(styles.load);
    }

    return (
        <>
            <form className={`${styles.itemForm} itemForm`} action="">
                <div className={styles.formHeader}>
                    <h1>MUELL MELDEN</h1>
                    <div className={styles.formProgressBar} progression={page}></div>
                    <div className={styles.formProgressText}>SCHRITT {page+1}/3</div>
                </div>

                { conditionalFormComponent() }
               
                <div className={styles.formNavigation}>
                    {
                        page > 0 && <button type="button" 
                                            className={`${styles.formNavigationButton} ${styles.btnBack}`} 
                                            id="formNavigationButtonBack"
                                            onClick={ () => setPage(page - 1) }>ZURÜCK</button>
                    }
                    
                    <button type="button" 
                            className={`${styles.formNavigationButton} ${styles.btnNext} ${page===0||page===1 ? "" : styles.btnSubmit}`} 
                            id="formNavigationButtonNext"
                            onClick={handleSubmit}>
                                <div id="spinner" className={styles.ldsring}><div></div><div></div><div></div><div></div></div>
                                { page === 0 || page === 1 ? "WEITER" : "ABSCHICKEN" }
                    </button>
                </div>
            </form>
            <div id="submitMessage" className={styles.postMessage}>{submitMessage}</div>
        </>
    )
}