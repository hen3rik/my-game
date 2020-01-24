import React from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab Two</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Game></Game>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;

const Game: React.FC = () => {
  return (
    <div className="game">
      <div className="grid">
        <div className="cell" style={{ width: "33.3%" }} />
        <div className="cell" style={{ width: "33.3%" }} />
        <div className="cell" style={{ width: "33.3%" }} />

        <div className="cell" style={{ width: "33.3%" }} />
        <div className="cell" style={{ width: "33.3%" }} />
        <div className="cell" style={{ width: "33.3%" }} />

        <div className="cell" style={{ width: "33.3%" }} />
        <div className="cell" style={{ width: "33.3%" }} />
        <div className="cell" style={{ width: "33.3%" }} />
      </div>
      <div className="message">Game Message Here...</div>
      <div className="button">
        <button>Start Game</button>
      </div>
    </div>
  );
};
