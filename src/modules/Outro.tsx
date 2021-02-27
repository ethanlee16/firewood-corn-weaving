import React from "react";
import FullscreenVideo from "../components/FullscreenVideo";

import "./Outro.css";

const Outro: React.FC = () => {
  return (
    <div className="outro-container">
      <FullscreenVideo videoId="10-credits-01" />
      <div className="credits-container">
        <div className="roll">
          <p>
            <b>Hermenegildo Godinez Jacinto</b> Video Director, Camera
          </p>

          <p>
            <b>Silverio Osbaldo Claudio</b> Video Director, Video Participant (Firewood)
          </p>

          <p>
            <b>Ana Aguilar</b> Video Participant (Corn), Camera
          </p>

          <p>
            <b>Javier Garcia</b> Video Participant (Corn)
          </p>

          <p>
            <b>Elizandro Sales</b> Video Director, Camera
          </p>

          <p>
            <b>Mario Jacinto</b> Video Director, Camera
          </p>

          <p>
            <b>Silvia Lucrecia Carrillo</b> Video Director, Video Participant (Weaving), Camera,
            Translation and Transcription
          </p>

          <p>
            <b>Brandon Lincoln Snyder</b> Artistic Director, Web Design
          </p>

          <p>
            <b>Christian Espinosa Schatz</b> Artistic Director, Text
          </p>

          <p>
            <b>Henry Sales</b> Artistic Director, Translation
          </p>

          <p>
            <b>Ethan Lee</b> Web Development, Web Design
          </p>

          <p>
            Finalmente, quiero dar un gran chjonte a Mintz por todo el trabajo y labor que hace por
            educar, enseñar, y comunicar sobre la cultura e idioma Mam. Como usted nos ha enseñado:
          </p>
          <p>Qo xnaq’tzan tuj tzalajb’il tu’ntzan tjaw ch’iy qchwinqlal. </p>
          <p>
            Chjonte kyiy,
            <br /> Christian b’ix Brandon
          </p>
        </div>
      </div>
      <div className="fundraise-container">
        <p>
          In November of 2020, Hurricanes Eta and Iota hit Central America within weeks of each
          other. San Juan Atitán suffered damage to crops, buildings, and infrastructure, dangerous
          landslides, and the tragic death of family members.
        </p>
        <p>
          Henry, one of the Mam authors and collaborators of this project, has organized a relief
          fund, which you can donate to here.
        </p>
        <a
          className="donate"
          target="_blank"
          rel="noreferrer"
          href="https://www.gofundme.com/f/flooding-in-san-juan-atitan-by-hurricane-eta?utm_source=customer&utm_campaign=m_pd+share-sheet&utm_medium=copy_link_all"
        >
          Donate to San Juan Atitán relief
        </a>
      </div>
    </div>
  );
};

export default Outro;
