import { FormHabit } from "@/src/features/home/form-habit";
import { View } from "@gluestack-ui/themed";

export default function AddHabitScreen(){
    return (
        <View flex={1} backgroundColor="$background">
            <FormHabit />
        </View>
    )
}