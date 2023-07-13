"use client"

import styles from '@/styles/report.module.css'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import Form from '@/components/Form'


export default function Report()
{

    return (
        <main className={styles.main}>
            {/* https://www.w3schools.com/howto/howto_js_form_steps.asp */}
            <Form/>
        </main>
    )
}