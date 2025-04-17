'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from 'next/cache';

function isInvalidText(text) {
    return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) {
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('mealImage'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    };

    if (!meal.image || !(meal.image instanceof File)) {
        return { message: 'Image file is required!' };
    }

    if (
        isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes('@')
    ) {
        return { message: 'Invalid input!' };
    }

    await saveMeal(meal);
    revalidatePath('/meals');
    redirect('/meals');
}