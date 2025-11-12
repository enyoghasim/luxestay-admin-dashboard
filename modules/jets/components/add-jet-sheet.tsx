import { Button } from "@/modules/common/components/ui/button";
import { Input } from "@/modules/common/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/modules/common/components/ui/sheet";
import * as React from "react";
import useUpload from "@/modules/uploads/hooks/useUpload";
import { CheckIcon, AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/modules/common/components/ui/card";
import { Field, Form, Formik } from "formik";
import { AddJetInitialValues } from "../types/jets.types";
import { AddJetSchema } from "../schema/jets";

const AddJetModal: React.FC<{
  isOpen?: boolean;
  onClose?: () => void;
}> = ({ isOpen = false, onClose }) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const upload = useUpload("jet");

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer?.files) upload.addFiles(e.dataTransfer.files);
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <Formik
      initialValues={AddJetInitialValues}
      validationSchema={AddJetSchema}
      onSubmit={() => {
        console.log("hello");
      }}
    >
      {({ handleSubmit, errors, setFieldValue }) => {
        // register Formik setter so the hook can notify when ids change
        upload.setOnIdsChange((ids) => {
          void setFieldValue("imageIds", ids);
        });
        return (
          <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add Jet</SheetTitle>
              </SheetHeader>
              <div className="grid h-[calc(100vh-124px)] overflow-y-auto flex-1 auto-rows-min gap-6 px-4">
                <Form onSubmit={handleSubmit} className="space-y-4">
                  <Field
                    as={Input}
                    name="manufacturer"
                    type="text"
                    required
                    placeholder="Embraer"
                    label="Manufacturer"
                    autoComplete="manufacturer"
                    error={errors.manufacturer}
                  />
                  <Field
                    as={Input}
                    name="model"
                    type="text"
                    required
                    placeholder="Legacy 450"
                    label="Model"
                    autoComplete="model"
                    error={errors.model}
                  />
                  <Field
                    as={Input}
                    name="classification"
                    type="text"
                    required
                    placeholder="Light Jet"
                    label="Classification"
                    autoComplete="classification"
                    error={errors.classification}
                  />
                  <Field
                    as={Input}
                    name="seats"
                    type="number"
                    required
                    placeholder=""
                    label="Seats"
                    autoComplete="seats"
                    error={errors.seats}
                  />
                  <Field
                    as={Input}
                    name="speed"
                    type="text"
                    required
                    placeholder="500kts"
                    label="Speed"
                    autoComplete="speed"
                    error={errors.speed}
                  />
                  <Field
                    as={Input}
                    name="range"
                    type="text"
                    required
                    placeholder="5000 nautical miles"
                    label="Range"
                    autoComplete="range"
                    error={errors.range}
                  />
                  <Field
                    as={Input}
                    name="luggageCapacity"
                    type="text"
                    required
                    placeholder="50 bags"
                    label="Luggage Capacity"
                    autoComplete="luggageCapacity"
                    error={errors.luggageCapacity}
                  />
                  <Field
                    as={Input}
                    name="interiorHeight"
                    type="number"
                    required
                    placeholder="50 meters"
                    label="Interior Height"
                    autoComplete="interiorHeight"
                    error={errors.interiorHeight}
                  />

                  <Field
                    as={Input}
                    name="interiorWidth"
                    type="number"
                    required
                    placeholder="50 meters"
                    label="Interior Width"
                    autoComplete="interiorWidth"
                    error={errors.interiorWidth}
                  />
                  <div>
                    <Card className="col-span-1">
                      <CardHeader>
                        <CardTitle>Photos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div
                          className={`w-full rounded-md border border-dashed border-muted p-4 text-center ${
                            upload.files.length > 0
                              ? "bg-transparent"
                              : "bg-muted/5"
                          }`}
                          onDrop={onDrop}
                          onDragOver={onDragOver}
                        >
                          <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => upload.addFiles(e.target.files)}
                          />

                          {upload.files.length === 0 ? (
                            <div className="flex flex-col items-center justify-center gap-3 py-8">
                              <div className="text-sm text-muted-foreground">
                                Drag & drop images here
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                type="button"
                                onClick={() => inputRef.current?.click()}
                              >
                                Upload photos
                              </Button>
                            </div>
                          ) : (
                            <div className="grid grid-cols-3 gap-3">
                              {upload.files.map((f) => (
                                <div
                                  key={f.id}
                                  className="relative rounded-md overflow-hidden border bg-background"
                                >
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={f.blob}
                                    alt={f.name}
                                    className="h-28 w-full object-cover"
                                  />

                                  {/* status overlay */}
                                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="flex items-center justify-center">
                                      {f.state === "pending" ||
                                      f.state === "getting-upload-url" ? (
                                        <svg
                                          className="animate-spin h-8 w-8 text-muted-foreground"
                                          viewBox="0 0 24 24"
                                        >
                                          <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeDasharray="60"
                                            strokeDashoffset="20"
                                            fill="none"
                                          />
                                        </svg>
                                      ) : f.state === "uploading" ? (
                                        <svg
                                          width="36"
                                          height="36"
                                          viewBox="0 0 36 36"
                                          className=""
                                        >
                                          <circle
                                            cx="18"
                                            cy="18"
                                            r="16"
                                            strokeWidth="4"
                                            stroke="#e6e6e6"
                                            fill="none"
                                          />
                                          <circle
                                            cx="18"
                                            cy="18"
                                            r="16"
                                            strokeWidth="4"
                                            stroke="#6366f1"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeDasharray={String(
                                              2 * Math.PI * 16
                                            )}
                                            strokeDashoffset={String(
                                              (1 -
                                                (f.uploadPercent ?? 0) / 100) *
                                                2 *
                                                Math.PI *
                                                16
                                            )}
                                            transform="rotate(-90 18 18)"
                                          />
                                        </svg>
                                      ) : f.state === "uploaded" ? (
                                        <CheckIcon className="size-6 text-green-600" />
                                      ) : (
                                        <AlertTriangle className="size-6 text-destructive" />
                                      )}
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    aria-label={`Remove ${f.name}`}
                                    onClick={() => upload.removeFile(f.id)}
                                    className="absolute top-1 right-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm shadow"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                              {/* plus button to add more */}
                              <div className="flex items-center justify-center h-28 w-full rounded-md border border-dashed">
                                <button
                                  type="button"
                                  onClick={() => inputRef.current?.click()}
                                  className="flex h-10 w-10 items-center justify-center rounded-full border bg-transparent text-lg"
                                  aria-label="Add more photos"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    <span className="text-xs text-red-500 mt-1 ml-1 capitalize">
                      {errors.imageIds}
                    </span>
                  </div>
                </Form>
              </div>
              <SheetFooter className="flex flex-row items-center justify-end">
                <Button type="submit" className="w-fit">
                  Add Jet
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        );
      }}
    </Formik>
  );
};

export default AddJetModal;
