import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import '../../styles/components/sidebar.css'

import mapMarkerImg from '../../images/map-marker.svg';

export const Sidebar: React.FC = () => {
    const { push } = useHistory();
    return (
        <aside className="app-sidebar">
            <img src={mapMarkerImg} alt="Happy" />

            <footer>
                <button type="button" onClick={() => push('/app')}>
                    <FiArrowLeft size={24} color="#FFF" />
                </button>
            </footer>
        </aside>
    );
}