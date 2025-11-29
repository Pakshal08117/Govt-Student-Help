import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLang } from "@/contexts/LanguageContext";
import { documentServices, calculateApplicationFee } from "@/data/documentServices";
import { FileText, IndianRupee, CheckCircle2, Clock, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface DocumentAssistanceModalProps {
  open: boolean;
  onClose: () => void;
  onProceed: (selectedServices: string[], totalFee: number) => void;
  schemeId: string;
  requiredDocuments: string[];
}

export default function DocumentAssistanceModal({
  open,
  onClose,
  onProceed,
  schemeId,
  requiredDocuments
}: DocumentAssistanceModalProps) {
  const { t, lang } = useLang();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [missingDocs, setMissingDocs] = useState<string[]>([]);

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const toggleMissingDoc = (doc: string) => {
    setMissingDocs(prev =>
      prev.includes(doc)
        ? prev.filter(d => d !== doc)
        : [...prev, doc]
    );
  };

  const fee = calculateApplicationFee(
    schemeId,
    selectedServices.length > 0,
    selectedServices.length
  );

  const handleProceed = () => {
    onProceed(selectedServices, fee.total);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <HelpCircle className="h-6 w-6 text-primary" />
            {t("documentAssistance")}
          </DialogTitle>
          <DialogDescription>
            {t("documentAssistanceDesc")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Required Documents Checklist */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {t("requiredDocuments")}
              </h3>
              <div className="space-y-3">
                {requiredDocuments.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Checkbox
                      id={`doc-${idx}`}
                      checked={!missingDocs.includes(doc)}
                      onCheckedChange={() => toggleMissingDoc(doc)}
                    />
                    <label htmlFor={`doc-${idx}`} className="text-sm cursor-pointer flex-1">
                      {doc}
                    </label>
                    {missingDocs.includes(doc) && (
                      <Badge variant="destructive" className="text-xs">
                        {t("missing")}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Document Assistance Services */}
          {missingDocs.length > 0 && (
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4 text-primary">
                  {t("needHelp")} {t("weCanHelp")}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("documentAssistanceInfo")}
                </p>

                <div className="space-y-4">
                  {documentServices.map((service) => (
                    <div
                      key={service.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedServices.includes(service.id)
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                      onClick={() => toggleService(service.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedServices.includes(service.id)}
                          onCheckedChange={() => toggleService(service.id)}
                        />
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">
                            {service[`name_${lang}` as keyof typeof service]}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {service[`description_${lang}` as keyof typeof service]}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 text-green-600">
                              <IndianRupee className="h-4 w-4" />
                              <span className="font-semibold">{service.price}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{service.processingTime}</span>
                            </div>
                          </div>

                          {selectedServices.includes(service.id) && (
                            <Accordion type="single" collapsible className="mt-3">
                              <AccordionItem value="steps" className="border-none">
                                <AccordionTrigger className="text-sm py-2">
                                  {t("viewSteps")}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <ol className="space-y-2 mt-2">
                                    {service.steps.map((step, idx) => (
                                      <li key={idx} className="flex gap-2 text-sm">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                                          {idx + 1}
                                        </span>
                                        <span className="text-muted-foreground">
                                          {step[`step_${lang}` as keyof typeof step]}
                                        </span>
                                      </li>
                                    ))}
                                  </ol>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Fee Summary */}
          <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">{t("feeSummary")}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{t("baseFee")}</span>
                  <span className="font-medium">₹{fee.baseFee}</span>
                </div>
                {selectedServices.length > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>{t("documentAssistanceFee")} ({selectedServices.length} {t("documents")})</span>
                    <span className="font-medium">₹{fee.documentAssistanceFee}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{t("processingFee")}</span>
                  <span className="font-medium">₹{fee.processingFee}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>{t("total")}</span>
                  <span className="text-primary">₹{fee.total}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <p className="text-xs text-blue-900 dark:text-blue-100">
                  💡 {t("affordablePricing")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              {t("cancel")}
            </Button>
            <Button onClick={handleProceed} className="flex-1">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {t("proceedToPayment")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
