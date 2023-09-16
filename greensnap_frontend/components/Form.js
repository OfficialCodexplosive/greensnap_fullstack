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
    
                    const res = await fetch('/api/get-coordinates', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(coordinateData)
                    });
                    
                    const data = await res.json();
                    
    
                    if(!data.precise)
                    {
                        setSubmitMessage("Die genauen Koordinaten konnten nicht ermittelt werden. Bitte bestimme den genauen Standort über die Karte. Deine Standortdaten werden nicht erhoben.");
                        // AKTIVIERE KARTE
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
                }else if (formData.localizationType === "gps") {
                    console.log("GPS Coordinates", formData.latitude, formData.longitude)
                } else {
                    
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
                const res = await fetch('/api/post-item', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const data = await res.json();
                setSubmitMessage(res.status);
                
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

    return (
        <>
            <form className={`${styles.itemForm} itemForm`} action="">
                <div className={styles.formHeader}>
                    <h1>MUELL MELDEN</h1>
                    <div className={styles.formProgressBar}></div>
                    <div className={styles.formProgressText}>SCHRITT {page+1}/3</div>
                </div>

                { conditionalFormComponent() }

                <div className={styles.formNavigation}>
                    {
                        page > 0 && <button type="button" 
                                            className={styles.formNavigationButton} 
                                            id="formNavigationButtonBack"
                                            onClick={ () => setPage(page - 1) }>ZURÜCK</button>
                    }
                    
                    <button type="button" 
                            className={styles.formNavigationButton} 
                            id="formNavigationButtonNext"
                            onClick={handleSubmit}>{ page === 0 || page === 1 ? "WEITER" : "ABSCHICKEN" }</button>
                </div>
            </form>
            { submitMessage && <div className={styles.postMessage}>{submitMessage}</div> }
        </>
    )
}