import { Layout } from "@/src/constants/layout";
import { FormHabit } from "@/src/features/home/form-habit";
import { t } from "i18next";

export default function AddHabitScreen(){
    return (
        <Layout label={t('addHabit')}>
            <FormHabit />
        </Layout>
    )
}