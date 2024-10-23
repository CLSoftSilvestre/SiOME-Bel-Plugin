import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ModelInterface } from '../types/model.interface';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  constructor() { }

  data = {
    models: [
      { name: "Pasteurizer", process: "Process", description: "A pasteurizer is a device that heats food and beverages to a specific temperature for a set period to kill harmful microorganisms, ensuring safety and extending shelf life.", imgPath: "https://www.neologicengineers.com/images/product_1.webp"},
      { name: "Reception line", process: "Process", description: "A milk reception line is a system in dairy processing facilities where raw milk is received, tested, and prepared for further processing", imgPath: "https://www.spxflow.com/assets/half-width/apv-milk-reception-line.jpg"},
      { name: "CIP station", process: "Process", description: "A CIP (Cleaning in Place) station is a system designed to clean the interior surfaces of pipes, vessels, equipment, and associated fittings without disassembly. It automates the preparation, circulation, and verification of cleaning and disinfection solutions through the same routes used during production, ensuring compliance with hygiene standards.", imgPath: "https://www.hermis.biz/uploads/Products/product_88/hermis_0006_1547731277.png"},
      { name: "Cream separator", process: "Process", description: "A dairy cream separator is a machine that uses centrifugal force to separate cream from whole milk. It rapidly spins the milk, causing the heavier skim milk to move outward and the lighter cream to collect in the center, which is then funneled into a separate container", imgPath: "https://www.inoxpausa.com/uploads/producte/Centrifugal-separator/Centrifugal-separator.jpg"},
      { name: "Metal detector", process: "Packaging", description: "A metal detector is an electronic device that uses electromagnetic fields to detect the presence of metal objects. It typically consists of a search coil, an oscillator, a detector, and an audio or visual indicator. When the search coil is near a metal object, it induces eddy currents, which are detected and signaled to the user.", imgPath: "https://microsep.co.za/wp-content/uploads/2023/12/07b7d283b2ba41c756d07e0d3a4efbed.jpg"},
      { name: "Thermoforming packaging", process: "Packaging", description: "Thermoforming vacuum packaging is a process used to create packaging by heating a plastic sheet until it becomes pliable, then forming it into a specific shape using a mold and vacuum pressure. This method is commonly used for packaging various products, including food items like cheese, meats, and other perishable goods.", imgPath: "https://www.utoc.sg/wp-content/uploads/2024/03/Utoc-Thermoform-Vacuum-Pack.jpeg"},
      { name: "Electrical analyser", process: "Energy", description: "An electrical power analyzer is a device that measures and analyzes electrical power parameters such as voltage, current, power factor, and energy consumption. It provides valuable data for optimizing electrical systems, ensuring operational efficiency, and detecting power quality issues like harmonics, voltage dips, and surges.", imgPath: "https://www.eibabo.pt/media/image/84/d9/60/EB11104614HExtMueiheavw_600x600.jpg"},
      { name: "Air compressor", process: "Energy", description: "An air compressor is a device that converts power into potential energy stored in compressed air. It is used to power tools, machinery, and various industrial processes by delivering reliable compressed air.", imgPath: "https://candl.ie/wp-content/uploads/2017/10/AQ-30-55-15-55-VSD.jpg"}
    ]
  }

  getModels(): Observable<ModelInterface[]> {
    return of(this.data.models)
  }

}
