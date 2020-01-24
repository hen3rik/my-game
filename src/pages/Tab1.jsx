import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { book, build, colorFill, grid } from "ionicons/icons";
import React from "react";
import "./Tab1.css";

const Tab1 = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab One</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Game></Game>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

const Cell = () => {
  return <div className="cell" style={{ width: "33.3%" }} />;
};

const Footer = () => {
  return (
    <>
      <div className="message">Game Message Here......</div>
      <div className="button">
        <button>Start Game</button>
      </div>
    </>
  );
};

const Game = () => {
  return (
    <div className="game">
      <div className="grid">
        <Cell />
        <Cell />
        <Cell />

        <Cell />
        <Cell />
        <Cell />

        <Cell />
        <Cell />
        <Cell />
      </div>
      <Footer />
    </div>
  );
};
