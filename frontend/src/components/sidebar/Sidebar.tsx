import React from "react";
import "./sidebar.scss";

import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import LogoDevOutlinedIcon from '@mui/icons-material/LogoDevOutlined';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import DoNotTouchOutlinedIcon from '@mui/icons-material/DoNotTouchOutlined';
import LocalTaxiOutlinedIcon from '@mui/icons-material/LocalTaxiOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import CalendarViewMonthOutlinedIcon from '@mui/icons-material/CalendarViewMonthOutlined';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="sidebar">
            <div className="top">
                <span className="logo">jjuarezitc</span>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">POKE DATA</p>
                    <Link to="/">
                        <li className={location.pathname === '/' ? 'active' : ''}>
                        <CatchingPokemonIcon className="icon" />
                            <span>Pokedex</span>
                        </li>
                    </Link>

                    <p className="title">USEFUL LINKS</p>
                    <li>
                        <LayersOutlinedIcon className="icon" />
                        <span>Cras a tellus</span>
                    </li>

                    <li>
                        <CalendarViewMonthOutlinedIcon className="icon" />
                        <span>Vehicula aphemeral</span>
                    </li>

                    <li>
                        <FingerprintOutlinedIcon className="icon" />
                        <span>Eget aiquam</span>
                    </li>

                    <li>
                        <EmojiEmotionsOutlinedIcon className="icon" />
                        <span>Suspendisse Aplomb</span>
                    </li>

                    <li>
                        <ShareOutlinedIcon className="icon" />
                        <span>Varius morbi</span>
                    </li>

                    <li>
                        <LocalTaxiOutlinedIcon className="icon" />
                        <span>Sed quis mi</span>
                    </li>

                    <li>
                        <LogoDevOutlinedIcon className="icon" />
                        <span>Pulvinar nimi</span>
                    </li>

                    <li>
                        <StarHalfOutlinedIcon className="icon" />
                        <span>Nulla faciloisi</span>
                    </li>

                    <li>
                        <DoNotTouchOutlinedIcon className="icon" />
                        <span>Rhoncus effici</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar