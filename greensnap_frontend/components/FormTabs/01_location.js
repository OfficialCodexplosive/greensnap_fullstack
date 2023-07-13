import styles from '@/styles/report.module.css'

export default function LocationTab({ formData, setFormData })
{
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

        
        setFormData({
            ...formData,
            localizationType: e.value,
        });

    }
    return (
        <div className={`${styles.formTab} formTab`}>
            <h2 className={styles.formTabHeader}>DEINEN STANDORT BESTIMMEN</h2>

            <div className={styles.formTabContent}>
                <div className={styles.formTabContentSection}>
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
                </div>

                <div className={styles.formTabContentSection}>
                    <h3 className={styles.formContentHeader}>WIE SOLL DEIN STANDORT BESTIMMT WERDEN?</h3>
                    {/* https://codepen.io/jacobberglund/pen/mdPEza */}
                    <div className={styles.formContentRow}>
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

                <div className={`${styles.formTabContentSection} localization_section localization_manual_section`}>
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
                        <input 
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

                <div className={`${styles.formTabContentSection} localization_section localization_manual_section`}>
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

                <div className={`${styles.formTabContentSection} localization_section localization_gps_section`}>
                    <div className={styles.formGPSPlaceholder}></div>
                </div>
            </div>
        </div>
    )
}