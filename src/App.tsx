import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton, IonIcon, IonCard, IonCardContent, IonAlert } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import {useRef, useState} from "react";
import BmiControls from './components/BmiControls';
import InputControl from './components/InputControl';
import BmiResult from './components/BmiResult';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  const [ calculatedBMI, setCalculatedBMI ] = useState<number>();
  const [ calculatedBMIftlbs, setCalculatedBMIftlbs ] = useState<number>();
  const [BMIcategory, setBMIcategory] = useState<string>();
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const [ error, setError ] = useState<string>();
  var [ calcUnits, setCalcUnits ] = useState<'cmkg' | 'ftlbs'>('cmkg');

  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;

    if(!enteredWeight || !enteredHeight || +enteredHeight <= 0 || +enteredWeight <= 0){
      setError('Please enter a valid (non-negative) input number');
      return;
    } 
    const bmi = +enteredWeight / ((+enteredHeight/100) * (+enteredHeight/100));
    const bmi_ftlbs = (+enteredWeight/2.2046) / (((+enteredHeight*30.48)/100) * ((+enteredHeight*30.48)/100));

    var category;

    if (bmi < 18.5) {
      category = "Kurus";
    }
    if(bmi > 18.5 && bmi < 24.9) {
      category = "Normal";
    }
    if(bmi > 25 && bmi < 29.9) {
      category = "Gemuk";
    }
    if(bmi >= 30) {
      category = "Obesitas";
    }
    if (bmi_ftlbs < 18.5) {
      category = "Kurus";
    }
    if(bmi_ftlbs > 18.5 && bmi_ftlbs < 24.9) {
      category = "Normal";
    }
    if(bmi_ftlbs > 25 && bmi_ftlbs < 29.9) {
      category = "Gemuk";
    }
    if(bmi_ftlbs >= 30) {
      category = "Obesitas";
    }

    if(calcUnits == 'cmkg'){
      setCalculatedBMI(bmi);
      setBMIcategory(category);
    }
    if(calcUnits == 'ftlbs'){
      setCalculatedBMI(bmi_ftlbs);
      setBMIcategory(category);
    }
  };

  const resetInputs = () => {
    weightInputRef.current!.value = '';
    heightInputRef.current!.value = '';
  };

  const selectCalcUnitHandler = (selectedValue: 'cmkg' | 'ftlbs') => {
    setCalcUnits(selectedValue);
  };

  return (
    //<> ~ <React.Fragment>
    <>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[
          {text: 'Okay'}
        ]} />
      <IonApp>
        <IonHeader>
          <IonToolbar>
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>
          <IonGrid>
            <IonRow>
              <IonCol>
              <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler}/>
                <IonItem>
                  <IonLabel position="floating">Tinggi Badan ({calcUnits === 'cmkg' ? 'cm' : 'feet'})</IonLabel>
                  <IonInput ref={heightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Berat Badan ({calcUnits === 'cmkg' ? 'kg' : 'lbs'})</IonLabel>
                  <IonInput ref={weightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <BmiControls onCalculate={calculateBMI} onReset={resetInputs} />
            {calculatedBMI && BMIcategory && (
              <BmiResult BMIcalculated={calculatedBMI} categoryBMI={BMIcategory} />
            )}
          </IonGrid>
      </IonApp>
    </>
  )
};

export default App;
