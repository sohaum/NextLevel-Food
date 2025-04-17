import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
// import cloudinary from 'cloudinary';

const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2500)); // Simulate a delay
    const stmt = db.prepare('SELECT * FROM meals');
    const meals = stmt.all(); // Explicitly cast the result to Meal[]
    return meals;
}

export function getMeal(slug){
    const meal = db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
    return meal || null; // Return null if no meal is found
}

export async function saveMeal(meal) {
    meal.instructions = xss(meal.instructions);

    meal.slug = slugify(meal.title, { lower: true });

    if (typeof meal.image === 'object' && 'name' in meal.image && 'arrayBuffer' in meal.image) {
        const extension = meal.image.name.split('.').pop();
        const fileName = `${meal.slug}.${extension}`;

        const stream = fs.createWriteStream(`public/images/${fileName}`);
        const bufferedImage = await meal.image.arrayBuffer();
        stream.write(Buffer.from(bufferedImage), (error) => {
            if (error) throw new Error('Saving image failed!');
        });
        meal.image = `/images/${fileName}`;
    } else {
        throw new Error('Invalid image format!');
    }

    const result = db.prepare(`
        INSERT INTO meals 
        (title, summary, instructions, image, slug, creator, creator_email)
        VALUES (
            @title, @summary, @instructions, @image, @slug, @creator, @creator_email
        )
    `).run(meal);

    // Add the generated id to the meal object
    meal.id = result.lastInsertRowid.toString();

    return meal;
}


