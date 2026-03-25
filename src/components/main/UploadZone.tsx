import { useRef, useState, useCallback } from 'react';
import { UploadCloud, X, ScanLine } from 'lucide-react';
import { useReceiptStore } from '../../store/receiptStore';
import { useCalculateCO2 } from '../../hooks/useCalculateCO2';
import { Button } from '../ui/Button';

export function UploadZone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const { file, setFile } = useReceiptStore();
  const { mutate, isPending, error, reset: resetMutation } = useCalculateCO2();

  const handleFile = useCallback(
    (f: File) => {
      if (!f.type.startsWith('image/')) return;
      setFile(f);
    },
    [setFile]
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const preview = file ? URL.createObjectURL(file) : null;

  const handleRemove = () => {
    setFile(null);
    resetMutation();
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => !file && inputRef.current?.click()}
        className={[
          'relative w-full max-w-md h-64 rounded-3xl border-2 border-dashed',
          'flex flex-col items-center justify-center gap-3 transition-all duration-200',
          !file ? 'cursor-pointer' : '',
          dragging
            ? 'border-brand bg-brand/5 scale-[1.02]'
            : 'border-brand/30 bg-brand/5 hover:bg-brand/10 hover:border-brand/50',
        ].join(' ')}
      >
        {preview ? (
          <img
            src={preview}
            alt="Receipt preview"
            className="h-full w-full object-contain rounded-3xl p-2"
          />
        ) : (
          <>
            <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center text-brand">
              <UploadCloud size={28} />
            </div>
            <p className="text-sm text-brand font-medium">Drop your receipt here</p>
            <p className="text-xs text-brand/50">or click to browse</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 text-center">
          {(error as Error).message}
        </p>
      )}

      <div className="flex gap-3">
        {file && (
          <Button variant="outline" onClick={handleRemove} disabled={isPending}>
            <X size={15} /> Remove
          </Button>
        )}
        <Button
          size="lg"
          loading={isPending}
          disabled={!file}
          onClick={() => file && mutate(file)}
        >
          <ScanLine size={17} />
          {isPending ? 'Calculating…' : 'Calculate CO₂'}
        </Button>
      </div>
    </div>
  );
}