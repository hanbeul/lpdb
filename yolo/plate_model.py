import torch
from transformers import AutoModel, AutoTokenizer

class PlateModel:
    def __init__(self) -> None:
        self._plate_model = torch.hub.load("ultralytics/yolov5", "custom", path="./yolov5s_weights.pt", force_reload=True)  # or yolov5n - yolov5x6, custom
        self._tokenizer = AutoTokenizer.from_pretrained('ucaslcl/GOT-OCR2_0', trust_remote_code=True)
        self._ocr_model = AutoModel.from_pretrained('ucaslcl/GOT-OCR2_0', trust_remote_code=True, low_cpu_mem_usage=True, device_map='cuda', use_safetensors=True, pad_token_id=self._tokenizer.eos_token_id)
        self._ocr_model = self._ocr_model.eval().cuda()
    def classify(self, img):
        results = self._plate_model(img)
        results.print()  # or .show(), .save(), .crop(), .pandas(), etc.
        crop = results.crop(save=False)[0]['im']
        plate = self._ocr_model.chat(self._tokenizer, crop, ocr_type='ocr')
        print(plate)
        #res = model.chat(tokenizer, image_file, ocr_type='ocr')
        return plate
