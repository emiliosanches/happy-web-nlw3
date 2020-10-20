import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";

import '../../styles/pages/orphanage.css';
import { Sidebar } from "../../components/Sidebar";
import { mapIcon } from "../../utils/mapIcon";
import { api } from "../../services/api";
import { useParams } from "react-router-dom";

interface OrphanageData {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: string;
    images: Array<{
        url: string;
        id: number;
    }>;
}

interface OrphanageRouteParams {
    id: string;
}

export default function Orphanage() {
    const [orphanageData, setOrphanageData] = useState<OrphanageData>();
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const params = useParams<OrphanageRouteParams>();

    useEffect(() => {
        api.get(`/orphanages/${params.id}`).then(response => {
            setOrphanageData(response.data);
        });
    }, [params.id])

    if (!orphanageData) return <p style={{color: 'black'}}>Carregando...</p>;

    return (
        <div id="page-orphanage">
            <Sidebar />

            <main>
                <div className="orphanage-details">
                    <img src={orphanageData.images[activeImageIndex].url} alt={orphanageData.name} />

                    <div className="images">
                        { orphanageData.images.map((image, index) => {
                            return (
                                <button 
                                    key={image.id} 
                                    className={activeImageIndex === index ? "active" : ""}
                                    type="button"
                                    onClick={() => setActiveImageIndex(index)}
                                >
                                    <img src={image.url} alt={orphanageData.name} />
                                </button>
                            );
                        }) }
                    </div>
                    
                    <div className="orphanage-details-content">
                        <h1>{orphanageData.name}</h1>
                        <p>{orphanageData.about}</p>

                        <div className="map-container">
                            <Map 
                                center={[orphanageData.latitude, orphanageData.longitude]}
                                zoom={16} 
                                style={{ width: '100%', height: 280 }}
                                dragging={false}
                                touchZoom={false}
                                zoomControl={false}
                                scrollWheelZoom={false}
                                doubleClickZoom={false}
                            >
                                <TileLayer 
                                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                                />
                                <Marker interactive={false} icon={mapIcon} position={[orphanageData.latitude, orphanageData.longitude]} />
                            </Map>

                            <footer>
                                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanageData.latitude},${orphanageData.longitude}`}>Ver rotas no Google Maps</a>
                            </footer>
                        </div>

                        <hr />

                        <h2>Instruções para visita</h2>
                        <p>{orphanageData.instructions}</p>

                        <div className="open-details">
                            <div className="hour">
                                <FiClock size={32} color="#15B6D6" />
                                Segunda à Sexta <br />
                                {orphanageData.opening_hours}
                            </div>
                            { orphanageData.open_on_weekends ? (
                                <div className="open-on-weekends">
                                <FiInfo size={32} color="#39CC83" />
                                Atendemos <br />
                                fim de semana
                            </div>
                            ): (
                                <div className="open-on-weekends not-opened">
                                <FiInfo size={32} color="#FF669D" />
                                Não atendemos <br />
                                fim de semana
                            </div>
                            ) }
                        </div>

                        <button type="button" className="contact-button">
                        <FaWhatsapp size={20} color="#FFF" />
                        Entrar em contato
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}