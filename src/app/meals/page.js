import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "../components/meals/meal-grid";
import { getMeals } from "../../../lib/meals";
import { Suspense } from "react";

export const metadata = {
  title: 'All Meals',
  description: 'Browse all the Meals shared by users',
};

async function Meals() {
    const meals = await getMeals(); 
    return <MealsGrid meals={meals} />;
}

export default async function MealsPage() {
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious meals, created{' '}
                    <span className={classes.highlight}>by you</span>!
                </h1>
                <p>
                    Choose your favorite recipe and cook it yourself. It is easy and fun!
                </p>
                <p className={classes.cta}>
                    <Link href="/meals/share">
                        Share your own recipe
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<h3 className={classes.loading}>Fetching Meals...</h3>}>
                    <Meals />
                </Suspense>
            </main>
        </>
    );
}
