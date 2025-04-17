"use client";
import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({ label, name }) {
    const [pickedImage, setPickedImage] = useState(); 
    const imageInput = useRef(null); // Removed TypeScript-specific syntax

    function handlePickClick() {
        if (imageInput.current) {
            imageInput.current.click(); // Programmatically trigger the file input click
        }
    }

    function handleImageChange(event) {
        const file = event.target.files?.[0];
        if (!file) return;

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result); 
        };
        fileReader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <input
                    className={classes.input}
                    type="file"
                    id={name}
                    accept="image/*"
                    name={name}
                    ref={imageInput} // Correctly using useRef
                    onChange={handleImageChange}
                />
                <button
                    className={classes.button}
                    type="button"
                    onClick={handlePickClick}
                >
                    Upload Image
                </button>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && (
                        <Image
                            src={pickedImage}
                            alt="The image selected by the user"
                            fill
                        />
                    )}
                </div>
            </div>
        </div>
    );
}