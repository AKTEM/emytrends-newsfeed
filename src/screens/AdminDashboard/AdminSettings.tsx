import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { getSiteSettings, updateSiteSettings } from "../../lib/firebaseSiteSettings";
import { Settings, Save } from "lucide-react";

const MAX_PROMO_WORDS = 15;

export const AdminSettings = () => {
  const [promoText, setPromoText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await getSiteSettings();
        setPromoText(settings.promoText);
      } catch (error) {
        console.error("Error loading settings:", error);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const wordCount = promoText.trim().split(/\s+/).filter(Boolean).length;
  const isOverLimit = wordCount > MAX_PROMO_WORDS;

  const handleSave = async () => {
    if (isOverLimit) {
      setMessage({ type: "error", text: `Please reduce to ${MAX_PROMO_WORDS} words or less.` });
      return;
    }

    setSaving(true);
    setMessage(null);
    
    try {
      await updateSiteSettings({ promoText: promoText.trim() });
      setMessage({ type: "success", text: "Settings saved successfully!" });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to save settings. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-8">
        <div className="text-lg">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8 flex items-center gap-3">
        <Settings className="w-6 h-6 sm:w-8 sm:h-8" />
        Site Settings
      </h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Promotional Banner Text</CardTitle>
          <p className="text-sm text-muted-foreground">
            This text appears in the promotional banner at the top of all pages.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Banner Text
            </label>
            <textarea
              value={promoText}
              onChange={(e) => setPromoText(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 resize-none ${
                isOverLimit 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-border focus:ring-primary"
              }`}
              rows={3}
              placeholder="Enter promotional text..."
            />
            <div className={`flex justify-between items-center mt-2 text-sm ${
              isOverLimit ? "text-red-500" : "text-muted-foreground"
            }`}>
              <span>
                {wordCount} / {MAX_PROMO_WORDS} words
              </span>
              {isOverLimit && (
                <span className="font-medium">
                  Limit reached! Please reduce by {wordCount - MAX_PROMO_WORDS} word{wordCount - MAX_PROMO_WORDS > 1 ? 's' : ''}.
                </span>
              )}
            </div>
          </div>

          {message && (
            <div className={`p-3 rounded-lg text-sm ${
              message.type === "success" 
                ? "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-800"
            }`}>
              {message.text}
            </div>
          )}

          <Button
            onClick={handleSave}
            disabled={saving || isOverLimit}
            className="w-full sm:w-auto"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-backgroundbackground-0 p-4 rounded-lg text-center">
            <p className="text-sm sm:text-base">{promoText || "No text entered"}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
