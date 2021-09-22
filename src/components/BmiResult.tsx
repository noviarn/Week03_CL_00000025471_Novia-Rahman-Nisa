import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton, IonIcon, IonCard, IonCardContent, IonAlert } from '@ionic/react';

const BmiResult: React.FC<{
	BMIcalculated: number; 
	categoryBMI: string
}> = props => {
	return(
		<IonRow>
            <IonCol>
                <IonCard>
                    <IonCardContent className="ion-text-center">
                      <h2>{props.BMIcalculated}</h2>
                      <h1>{props.categoryBMI}</h1>
                    </IonCardContent>
                </IonCard>
            </IonCol>
        </IonRow>
	);
};

export default BmiResult;