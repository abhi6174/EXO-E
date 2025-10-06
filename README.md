🪐 Exoplanet Detection AI System

An automated machine learning pipeline for detecting exoplanets using NASA Kepler space telescope data. This system processes astronomical data to classify celestial objects as confirmed exoplanets or false positives.

⚠️ Current Status Notice
Important: The web interface (frontend/backend) is currently not functional. This repository primarily contains the research and development code executed in Google Colab.

📋 Project Overview
This project implements a machine learning system that:

Processes raw Kepler space telescope data

Automatically cleans and preprocesses astronomical datasets

Identifies important features for exoplanet detection

Trains Random Forest models with ~96% accuracy

Classifies celestial objects as exoplanets or false positives

🚀 Quick Start
Google Colab Implementation
The primary implementation is available as a Google Colab notebook:
link: https://colab.research.google.com/github/abhi6174/EXO-E/blob/main/Exoplanet_detection.ipynb

Run the complete pipeline:

python
# The Colab notebook contains the full executable code
# Upload your dataset when prompted
# Select features interactively
# Train model with 96% accuracy target
Local Development (Experimental)
bash
# Clone repository
git clone https://github.com/yourusername/exoplanet-detection-ai.git
cd exoplanet-detection-ai


# Note: Frontend/backend components require are not working now
🛠️ Technical Architecture
Core Components
Data Processing: Automated cleaning, imputation, and normalization

Feature Selection: ML-driven identification of important planetary parameters

Model Training: Regularized Random Forest for exoplanet classification

Validation: Cross-validation and performance metrics

Technologies Used
Python 3.8+

Scikit-learn (Random Forest, preprocessing)

Pandas & NumPy (Data manipulation)

Google Colab (Primary execution environment)

📁 Project Structure

🎯 Key Features
✅ Working Components
Data preprocessing pipeline

Automated feature selection

Machine learning model training

Performance evaluation metrics

Google Colab integration

🚧 Under Development
Web interface - Currently non-functional

REST API backend - Requires debugging

Real-time predictions - Integration needed

🔬 Usage Examples
Basic Data Processing
python
from src.data_processing import clean_kepler_data
from src.model_training import train_exoplanet_model

# Load and clean data
df_cleaned = clean_kepler_data('kepler_data.csv')

# Train model
model, accuracy = train_exoplanet_model(df_cleaned)
print(f"Model accuracy: {accuracy:.4f}")
Feature Selection
python
# Interactive feature selection in Colab
# System suggests important parameters:
# 1. koi_period (importance: 0.1542)
# 2. koi_depth (importance: 0.1285)
# 3. koi_teq (importance: 0.0954)
📊 Model Performance
Target Accuracy: 96% (to prevent overfitting)

Actual Performance: 99%(overfitting)

Cross-Validation: 5-fold validation implemented

Feature Importance: Automated ranking of planetary parameters

🎓 Research Basis
This project uses NASA's Kepler Mission data and implements methodologies from astronomical research and machine learning literature. The system is designed to assist astronomers in the exoplanet discovery process.

🤝 Contributing
We welcome contributions! Since the web interface is currently non-functional, we're particularly interested in help with:

Frontend/backend debugging

Additional ML model implementations

Data preprocessing improvements

Documentation and examples

Please see our Contributing Guidelines for more details.

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
NASA Kepler Mission for the astronomical data

Scikit-learn and Python communities

Google Colab for computational resources

📞 Contact
For questions about the machine learning components or research applications:

GitHub Issues: Create an issue

Email: your-email@domain.com

Note: This is primarily a research project. The web application components are experimental and require additional development.

