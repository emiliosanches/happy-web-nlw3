import React, { ChangeEvent, FormEvent, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import { mapIcon } from "../../utils/mapIcon";
import { Sidebar } from "../../components/Sidebar";

import '../../styles/pages/create-orphanage.css';
import { api } from "../../services/api";
import { useHistory } from "react-router-dom";

export default function CreateOrphanage() {

    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [instructions, setInstructions] = useState('');
    const [opening_hours, setOpeningHours] = useState('');
    const [open_on_weekends, setOpenOnWeekends] = useState(true);
    const [images, setImages] = useState<File[]>([]);
    const [imagesPreview, setImagesPreview] = useState<string[]>([]);

    const { push } = useHistory();

    function handleMapClick(evt: LeafletMouseEvent) {

        const {lat: latitude, lng: longitude} = evt.latlng;

        setPosition({
            latitude,
            longitude
        })
    }

    function handleSubmit(evt: FormEvent) {
        evt.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('about', about);
        formData.append('latitude', String(position.latitude));
        formData.append('longitude', String(position.longitude));
        formData.append('instructions', instructions);
        formData.append('opening_hours', opening_hours);
        formData.append('open_on_weekends', String(open_on_weekends));

        images.forEach(img => {
            formData.append('images', img);
        });

        api.post('/orphanages', formData).then(response => {
            alert("Cadastro realizado com sucesso!");
            push('/app')
        }).catch(err => {
            if (err.response?.status === 400) {
                return alert("Dados inválidos. Verifique-os e tente novamente");
            }
            alert("Ocorreu um erro, tente novamente.")
        })
    }

    function handleSelectImages(evt: ChangeEvent<HTMLInputElement>) {
        if (!evt.target.files) return;

        const selectedImages = Array.from(evt.target.files);
        setImages(selectedImages);

        const selectedImagesPreview = selectedImages.map(img => {
            return URL.createObjectURL(img);
        });

        setImagesPreview(selectedImagesPreview);
    }

    return (
        <div id="page-create-orphanage">
            <Sidebar />

            <main>
                <form className="create-orphanage-form" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Dados</legend>

                        <Map 
                            center={[-21.6870000, -51.0730000]} 
                            style={{ width: '100%', height: 280 }}
                            zoom={15}
                            onClick={handleMapClick}
                        >
                            <TileLayer 
                                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                            />

                            { position !== { latitude: 0, longitude: 0 } && (
                                <Marker 
                                    interactive={false} 
                                    icon={mapIcon} 
                                    position={[
                                        position.latitude, 
                                        position.longitude
                                    ]} 
                                />
                            ) }
                        </Map>

                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input 
                                id="name" 
                                value={name} 
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                            <textarea 
                                id="name" 
                                maxLength={300} 
                                value={about} 
                                onChange={e => setAbout(e.target.value)} 
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="images">Fotos</label>

                            <div className="images-container">
                                { imagesPreview.map(imgPreview => (
                                    <img key={imgPreview} src={imgPreview} alt={name} />
                                ))}
                                
                                <label className="new-image" htmlFor="image[]">
                                    <FiPlus size={24} color="#15b6d6" />
                                </label>
                            </div>
                            <input 
                                type="file" 
                                multiple
                                id="image[]"
                                onChange={handleSelectImages}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Visitação</legend>

                        <div className="input-block">
                            <label htmlFor="instructions">Instruções</label>
                            <textarea 
                                id="instructions" 
                                value={instructions}
                                onChange={e => setInstructions(e.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="opening_hours">Horário de funcionamento</label>
                            <input 
                                id="opening_hours" 
                                value={opening_hours}
                                onChange={e => setOpeningHours(e.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="open_on_weekends">Atende fim de semana</label>

                            <div className="button-select">
                                <button 
                                    type="button" 
                                    className={open_on_weekends ? "active" : ""}
                                    onClick={() => setOpenOnWeekends(true)}
                                >
                                    Sim
                                </button>

                                <button 
                                    type="button"
                                    className={open_on_weekends ? "" : "active"}
                                    onClick={() => setOpenOnWeekends(false)}
                                >
                                    Não
                                </button>
                            </div>
                        </div>
                    </fieldset>

                    <button className="confirm-button" type="submit">
                        Confirmar
                    </button>
                </form>
            </main>
        </div>
    );
}
