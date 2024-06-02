import Image from "./download.jpg"
import './image.css'

export default function addImage(){
    const img = document.createElement('img');
    img.alt = 'Nature Image';
    img.src = Image;
    img.classList.add('img');
    const body = document.querySelector('body');
    body.appendChild(img);
}