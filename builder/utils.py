from datetime import datetime
def load(path): return path.read_text(encoding="utf-8")
def save(path,data): path.write_text(data,encoding="utf-8")
def banner():
    print("="*60)
    print(" TLS BUILD SYSTEM ")
    print("="*60)
def ok(t): print("[OK]",t)
def timestamp(): return datetime.now().strftime("%Y-%m-%d %H:%M:%S")
