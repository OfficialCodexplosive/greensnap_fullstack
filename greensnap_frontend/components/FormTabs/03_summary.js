import styles from '@/styles/report.module.css'
import Link from 'next/link'

export default function DescriptionTab({ formData })
{
    return (
        <div className={`${styles.formTab} formTab`}>
            <h2 className={styles.formTabHeader}>ÜBERBLICK</h2>
            
            <div className={styles.formTabContent}>
                <div className={`${styles.formTabContentSection} ${styles.formTabSummary}`}>
                    <h3 className={styles.formContentHeader}>ZUSTAENDIGE BEHOERDE</h3>
                    <input type="text" name="summary_service_name" id="summary_service_name" placeholder="ORDNUNGSAMT MUSTERHAUSEN" readOnly/>
                    <input type="text" name="summary_service_phone" id="summary_service_phone" placeholder="+49 1234 5678910" readOnly/>
                    <input type="text" name="summary_service_email" id="summary_service_email" placeholder="ordnungsamt@musterhausen.de" readOnly/>
                    <div className={styles.formContentSubtext}>FEHLER KOENNEN <Link href="#">HIER</Link> GEMELDET WERDEN.</div>
                </div>

                <div className={`${styles.formTabContentSection} ${styles.formTabSummary}`}>
                    <h3 className={styles.formContentHeader}>FUND</h3>
                    <input type="text" name="summary_item_type" id="summary_item_type" placeholder={formData.typeOfItem} readOnly/>
                    <input type="text" name="summary_item_size" id="summary_item_size" placeholder={`${formData.sizeOfItem} CM`} readOnly/>
                    <input type="text" name="summary_item_place" id="summary_item_place" placeholder={formData.city} readOnly/>
                </div>
            </div>
        </div>
    )
}