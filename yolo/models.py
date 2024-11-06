import torch
from transformers import AutoModel, AutoTokenizer

class Model:
    def __init__(self) -> None:
        self._plate_model = torch.hub.load("ultralytics/yolov5", "custom", path="./yolov5s_weights.pt", force_reload=True)  # or yolov5n - yolov5x6, custom
        self._tokenizer = AutoTokenizer.from_pretrained('ucaslcl/GOT-OCR2_0', trust_remote_code=True)
        self._ocr_model = AutoModel.from_pretrained('ucaslcl/GOT-OCR2_0', trust_remote_code=True, low_cpu_mem_usage=True, device_map='cuda', use_safetensors=True, pad_token_id=self._tokenizer.eos_token_id)
        self._ocr_model = self._ocr_model.eval().cuda()
    def classify(img):
        results = model(img)
        crop = results.crop(save=False)[0]['im']
        results.print()  # or .show(), .save(), .crop(), .pandas(), etc.
        return results
