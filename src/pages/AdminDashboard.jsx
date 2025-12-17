import { useState } from "react";
import {
  Image as ImageIcon,
  Video as VideoIcon,
  Trash2,
  Upload,
  Save,
} from "lucide-react";

import instagram from "../components/ui/instagram.svg";
import facebook from "../components/ui/facebook.svg";
import tiktok from "../components/ui/tiktok.svg";
import maps from "../components/ui/maps.svg";
import call from "../components/ui/call.svg";
import { uploadImage, uploadVideo } from "../functions/upload";
import { saveLandingPage } from "../functions/landingPage";

/* ---------------- UTILS ---------------- */
const getMediaType = (file) => {
  if (!file) return null;
  if (file.type.startsWith("video")) return "video";
  if (file.type.startsWith("image")) return "image";
  return null;
};

/* ---------------- UI COMPONENTS ---------------- */
function SocialInput({ icon, placeholder, value, onChange }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-black/15 bg-white focus-within:ring-2 focus-within:ring-black transition">
      <img src={icon} alt="" className="w-5 h-5 opacity-70" />
      <input
        type="url"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent outline-none text-sm text-black placeholder-black/40"
      />
    </div>
  );
}

function ServiceCard({ service, updateService, deleteService }) {
  const mediaType = getMediaType(service.media);

  return (
    <div className="rounded-xl border border-black/10 bg-white shadow-sm overflow-hidden">
      {/* MEDIA */}
      <div className="relative h-48 bg-gray-100 flex items-center justify-center">
        {service.media ? (
          mediaType === "video" ? (
            <video
              src={URL.createObjectURL(service.media)}
              className="w-full h-full object-cover"
              controls
            />
          ) : (
            <img
              src={URL.createObjectURL(service.media)}
              alt=""
              className="w-full h-full object-cover"
            />
          )
        ) : (
          <label className="flex flex-col items-center justify-center gap-2 cursor-pointer text-gray-500 hover:text-black transition">
            <div className="flex items-center gap-2">
              <ImageIcon size={18} /> /
              <VideoIcon size={18} />
            </div>
            <span className="text-sm font-medium">
              Ajouter une image ou une vidéo
            </span>
            <div className="flex items-center gap-1 text-xs opacity-70">
              <Upload size={14} />
              Cliquer pour importer
            </div>
            <input
              type="file"
              accept="image/*,video/*"
              hidden
              onChange={(e) =>
                updateService(service.id, "media", e.target.files[0])
              }
            />
          </label>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-3">
        <input
          placeholder="Titre du service"
          value={service.title}
          onChange={(e) => updateService(service.id, "title", e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />

        <textarea
          placeholder="Description du service"
          value={service.description}
          onChange={(e) =>
            updateService(service.id, "description", e.target.value)
          }
          className="w-full border rounded-lg px-3 py-2 text-sm resize-none"
          rows={3}
        />

        <button
          onClick={() => deleteService(service.id)}
          className="flex items-center gap-2 text-red-600 text-sm hover:underline"
        >
          <Trash2 size={16} />
          Supprimer
        </button>
      </div>
    </div>
  );
}

/* ---------------- MAIN ---------------- */
export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    logo: null,
    cover: null,
    socials: {
      facebook: "",
      instagram: "",
      tiktok: "",
    },
  });

  const [actions, setActions] = useState({
    rdvEnabled: true,
    phone: "",
    locationUrl: "",
  });

  const [services, setServices] = useState([
    {
      id: Date.now(),
      title: "",
      description: "",
      media: null,
      active: true,
    },
  ]);

  /* ---------------- HELPERS ---------------- */

  const uploadMedia = async (file) => {
    if (!file) return null;

    if (file.type.startsWith("image")) {
      const res = await uploadImage(file);
      return { ...res, type: "image" };
    }

    if (file.type.startsWith("video")) {
      const res = await uploadVideo(file);
      return { ...res, type: "video" };
    }

    return null;
  };

  /* ---------------- SERVICES ---------------- */

  const addService = () => {
    setServices((s) => [
      ...s,
      {
        id: Date.now(),
        title: "",
        description: "",
        media: null,
        active: true,
      },
    ]);
  };

  const updateService = (id, key, value) => {
    setServices((s) =>
      s.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  };

  const deleteService = (id) => {
    setServices((s) => s.filter((item) => item.id !== id));
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSave = async () => {
    try {
      setLoading(true);

      /* ===== UPLOAD PROFILE MEDIA ===== */
      const logo =
        profile.logo instanceof File
          ? await uploadImage(profile.logo)
          : profile.logo;

      const cover =
        profile.cover instanceof File
          ? await uploadImage(profile.cover)
          : profile.cover;

      /* ===== UPLOAD SERVICES MEDIA ===== */
      const servicesPayload = await Promise.all(
        services.map(async (service) => {
          const media =
            service.media instanceof File
              ? await uploadMedia(service.media)
              : service.media;

          return {
            title: service.title,
            description: service.description,
            media,
            active: service.active,
          };
        })
      );

      /* ===== FINAL PAYLOAD ===== */
      const payload = {
        profile: {
          logo,
          cover,
          socials: profile.socials,
        },
        actions,
        services: servicesPayload,
      };

      await saveLandingPage(payload);

      alert("✅ Landing page enregistrée");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("❌ Erreur lors de l’enregistrement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-gray-200  space-y-6">
      {/* ================= PROFIL ================= */}
      <section className="bg-white rounded-xl shadow overflow-hidden">
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-xl font-semibold">Profil & Présentation</h2>
          <p className="text-sm text-black/50 mt-1">
            Image de couverture, photo de profil et réseaux sociaux.
          </p>
        </div>

        {/* COVER */}
        <div className="relative h-40 bg-black/5 flex items-center justify-center">
          {profile.cover && (
            <img
              src={URL.createObjectURL(profile.cover)}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <label className="absolute bottom-3 right-3 bg-black text-white px-3 py-1 text-xs rounded cursor-pointer">
            Modifier
            <input
              type="file"
              hidden
              onChange={(e) =>
                setProfile((p) => ({ ...p, cover: e.target.files[0] }))
              }
            />
          </label>
        </div>

        {/* PROFILE */}
        <div className="-mt-16 px-6 pb-6">
          <div className="relative w-32 h-32 rounded-full bg-white shadow-lg overflow-hidden">
            {profile.logo && (
              <img
                src={URL.createObjectURL(profile.logo)}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
            <label className="absolute inset-0 bg-black/40 text-white text-xs opacity-0 hover:opacity-100 flex items-center justify-center cursor-pointer transition">
              Changer
              <input
                type="file"
                hidden
                onChange={(e) =>
                  setProfile((p) => ({ ...p, logo: e.target.files[0] }))
                }
              />
            </label>
          </div>

          <div className="mt-6 max-w-md space-y-3">
            <SocialInput
              icon={facebook}
              placeholder="Lien Facebook"
              value={profile.socials.facebook}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  socials: {
                    ...profile.socials,
                    facebook: e.target.value,
                  },
                })
              }
            />
            <SocialInput
              icon={instagram}
              placeholder="Lien Instagram"
              value={profile.socials.instagram}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  socials: {
                    ...profile.socials,
                    instagram: e.target.value,
                  },
                })
              }
            />
            <SocialInput
              icon={tiktok}
              placeholder="Lien TikTok"
              value={profile.socials.tiktok}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  socials: { ...profile.socials, tiktok: e.target.value },
                })
              }
            />
          </div>
        </div>
      </section>

      {/* ================= ACTIONS ================= */}
      <section className="bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Actions & Contact</h2>
          <p className="text-sm text-black/50 mt-1">
            Paramètres de prise de rendez-vous et contact client.
          </p>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={actions.rdvEnabled}
            onChange={(e) =>
              setActions({ ...actions, rdvEnabled: e.target.checked })
            }
          />
          Activer la prise de rendez-vous
        </label>

        <SocialInput
          icon={call}
          placeholder="Téléphone"
          value={actions.phone}
          onChange={(e) => setActions({ ...actions, phone: e.target.value })}
        />

        <SocialInput
          icon={maps}
          placeholder="Lien Google Maps"
          value={actions.locationUrl}
          onChange={(e) =>
            setActions({ ...actions, locationUrl: e.target.value })
          }
        />
      </section>

      {/* ================= SERVICES ================= */}
      <section className="bg-white p-6 rounded-xl shadow space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Services & Produits</h2>
          <p className="text-sm text-black/50 mt-1">
            Ajoutez vos services avec image ou vidéo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              updateService={updateService}
              deleteService={deleteService}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={addService}
            className="px-6 py-3 bg-black text-white rounded-xl hover:opacity-90 transition"
          >
            + Ajouter un service
          </button>
        </div>
      </section>

      {/* ================= SAVE ================= */}
      <button
        onClick={handleSave}
        disabled={loading}
        className={`w-full py-4 rounded-xl flex items-center justify-center gap-2
          ${loading ? "bg-black/50" : "bg-black hover:opacity-90"} 
          text-white`}
      >
        <Save size={18} />
        {loading ? "Enregistrement..." : "Enregistrer"}
      </button>
    </div>
  );
}
