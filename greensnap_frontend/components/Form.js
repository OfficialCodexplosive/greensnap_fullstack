import styles from '@/styles/report.module.css'
import LocationTab from '@/components/FormTabs/01_location'
import DescriptionTab from '@/components/FormTabs/02_description'
import SummaryTab from '@/components/FormTabs/03_summary'
import { useState } from 'react'

{/* https://blog.logrocket.com/build-multi-step-form-usestate-hook/ */}
export default function Form()
{
    const [page, setPage] = useState(0);

    const [formData, setFormData] = useState({
        firstName : "",
        localizationType : "",
        street : "",
        streetNumber : "",
        postalCode : "",
        city : "",
        typeOfItem : "",
        sizeOfItem : "",
        pictureOfItem : ""
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
        setPage(page + 1);
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
                
                setPage(0);
                const data = await res.json();
                
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
                                            onClick={ () => setPage(page - 1) }>Back</button>
                    }
                    
                    <button type="button" 
                            className={styles.formNavigationButton} 
                            id="formNavigationButtonNext"
                            onClick={handleSubmit}>{ page === 0 || page === 1 ? "Next" : "Submit" }</button>
                </div>
            </form>
        </>
    )
}