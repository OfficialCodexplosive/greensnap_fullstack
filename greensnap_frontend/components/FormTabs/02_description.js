import styles from '@/styles/report.module.css'

export default function DescriptionTab({ formData, setFormData })
{
    const Select = ({  data, onChange, value }) => 
    {
        return (
            <label>
                <select 
                    value={value} 
                    onChange={(e) => { onChange(e); }}>
                    {
                        data.map((option, index) => {
                            return <option key={index} value={option.value}>{option.label}</option>
                        })
                    }
                </select>
            </label>
        )
    }
    return (
        <div className={`${styles.formTab} formTab`}>
            <h2 className={styles.formTabHeader}>DEINEN FUND BESCHREIBEN</h2>

            <div className={styles.formTabContent}>
                <div className={styles.formTabContentSection}>
                    <h3 className={styles.formContentHeader}>ART DES FUNDS</h3>
                    {/* <input 
                        type="dropdown" 
                        name="item_type" 
                        id="item_type" 
                        placeholder="ALTGLAS"/>
                    */}
                    <Select
                        data={[
                        { value: 'ALTGLAS', label: 'ALTGLAS' },
                        { value: 'ALTPAPIER', label: 'ALTPAPIER' },
                        { value: 'ELEKTROSCHROTT', label: 'ELEKTROSCHROTT' },
                        ]}
                        onChange={(e) => {
                            setFormData({ ...formData, typeOfItem: e.target.value });
                        }}
                        value={formData.typeOfItem}
                    />
                </div>

                <div className={styles.formTabContentSection}>
                    <h3 className={styles.formContentHeader}>GROESSE (IN CM)</h3>
                    <input 
                        type="number" 
                        name="item_size" 
                        id="item_size" 
                        default="50"
                        onChange={(e) => {
                            setFormData({ ...formData, sizeOfItem: e.target.value });
                        }}
                        value={formData.sizeOfItem}/>
                </div>

                <div className={styles.formTabContentSection}>
                    <h3 className={styles.formContentHeader}>BILD DES FUNDS</h3>
                    <input 
                        type="file" 
                        name="item_picture" 
                        id="item_picture"/>
                </div>
            </div>
        </div>
    )
}