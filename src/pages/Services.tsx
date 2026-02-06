import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { categories as cats, districts } from "@/data/locations";
import { services as allServices } from "@/data/services";
import { useLang } from "@/contexts/LanguageContext";

export default function Services() {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [district, setDistrict] = useState(searchParams.get("district") || "");
  const talukas = useMemo(() => districts.find(d => d.name === district)?.talukas ?? [], [district]);
  const [taluka, setTaluka] = useState(searchParams.get("taluka") || "");
  const [category, setCategory] = useState<string>(searchParams.get("category") || "");

  const services = useMemo(() =>
    allServices.filter(s =>
      (!district || s.district === district) &&
      (!taluka || s.taluka === taluka) &&
      (!category || s.category === category)
    ), [district, taluka, category]
  );

  const applyFiltersToUrl = () => {
    const params = new URLSearchParams();
    if (district) params.set("district", district); else params.delete("district");
    if (taluka) params.set("taluka", taluka); else params.delete("taluka");
    if (category) params.set("category", category); else params.delete("category");
    setSearchParams(params);
  };

  const canonicalHref = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <Helmet>
        <title>Government & Student Help Platform | Services</title>
        <meta name="description" content="Browse local government services by state, district, and category across India." />
        <link rel="canonical" href={canonicalHref} />
      </Helmet>

      <section className="container mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold mb-2">{t("services")}</h1>
          <p className="text-muted-foreground">{t("tagline")}</p>
        </div>

        <div className="grid gap-3 md:grid-cols-4 mb-6">
          <Select value={district} onValueChange={(v) => { setDistrict(v); setTaluka(""); }}>
            <SelectTrigger className="md:col-span-2 text-black [&>span]:text-black">
              <SelectValue placeholder={t("selectDistrict")} className="text-black" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((d) => (
                <SelectItem key={d.name} value={d.name} className="text-black">{d.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={taluka} onValueChange={setTaluka}>
            <SelectTrigger>
              <SelectValue placeholder={t("selectTaluka")} />
            </SelectTrigger>
            <SelectContent>
              {talukas.map((tq) => (
                <SelectItem key={tq} value={tq}>{tq}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder={t("category")} />
            </SelectTrigger>
            <SelectContent>
              {cats.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {lang === "hi" ? c.hi : lang === "mr" ? c.mr : c.en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3 mb-8">
          <Button onClick={applyFiltersToUrl} variant="default">Apply</Button>
          <Button onClick={() => { setDistrict(""); setTaluka(""); setCategory(""); setSearchParams(new URLSearchParams()); }} variant="outline">Reset</Button>
          <Button onClick={() => navigate("/tracking")} variant="secondary">Track Application</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {services.length === 0 && (
            <p className="text-muted-foreground">{t("noResults")}</p>
          )}

          {services.map((s) => (
            <Card key={s.id} className="hover:shadow-brand transition-smooth">
              <CardHeader>
                <CardTitle>
                  {lang === "hi" ? s.nameHi : lang === "mr" ? s.nameMr : s.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm">
                <div><span className="font-medium">{t("office")}:</span> {lang === "hi" ? s.officeHi : lang === "mr" ? s.officeMr : s.office}</div>
                <div><span className="font-medium">{t("address")}:</span> {s.address}</div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{t("phone")}:</span> 
                  <a href={`tel:${s.phone.replace(/[^+\d]/g, '')}`} className="text-primary hover:underline">
                    {s.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{t("email")}:</span> 
                  <a href={`mailto:${s.email}`} className="text-primary hover:underline">
                    {s.email}
                  </a>
                </div>
                <div><span className="font-medium">{t("workingHours")}:</span> {lang === "hi" ? s.workingHoursHi : lang === "mr" ? s.workingHoursMr : s.workingHours}</div>
                <div className="pt-2 flex gap-2 flex-wrap">
                  <a
                    className="inline-flex"
                    target="_blank"
                    rel="noreferrer"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`}
                    aria-label={t("getDirections")}
                  >
                    <Button variant="outline" size="sm">{t("getDirections")}</Button>
                  </a>
                  <a
                    className="inline-flex"
                    href={`/apply?service=${s.id}`}
                    aria-label={t("apply")}
                  >
                    <Button variant="default" size="sm">{t("apply")}</Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
