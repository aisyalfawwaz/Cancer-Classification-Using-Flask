import os
from flask import Flask, request, render_template
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np

app = Flask(__name__)

# Load model klasifikasi
model = load_model('model\model_fine_tuned.h5')

# Fungsi untuk memproses gambar yang diunggah
def process_image(image_path):
    img = image.load_img(image_path, target_size=(160, 160))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img /= 255.0
    return img

@app.route('/', methods=['GET', 'POST'])
def index():
    result = None
    if request.method == 'POST':
        if 'file' not in request.files:
            return render_template('index.html', error='File not found')

        file = request.files['file']
        if file.filename == '':
            return render_template('index.html', error='No selected file')

        if file:
            file_path = os.path.join('static/uploads', file.filename)
            file.save(file_path)
            img = process_image(file_path)
            prediction = model.predict(img)
            if prediction[0][0] > 0.5:
                result = 'Kanker Paru-paru Terdeteksi'
            else:
                result = 'Kanker Paru-paru Tidak Terdeteksi'
    
    return render_template('index.html', result=result)

if __name__ == '__main__':
    app.run(debug=True)
