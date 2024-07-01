import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const cache = new Map();

function useGet({ showToast = true, headers = {} } = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // State to store the last URL and tag
  const [lastUrl, setLastUrl] = useState(null);
  const [lastTag, setLastTag] = useState("default");

  const getData = async (url, tag = "default", messages = {}) => {
    setLoading(true);
    let loading_toast;
    // Update last URL and tag
    setLastUrl(url);
    setLastTag(tag);
    let tagCache = cache.get(tag);
    if (tagCache && tagCache.has(url)) {
      setData(tagCache.get(url));
      setLoading(false);
    } else {
      if (showToast) {
        loading_toast = toast.loading(messages?.loading || "Loading...");
      }
      try {
        const response = await axios.get(url, { headers });
        setData(response.data);
        if (!tagCache) {
          tagCache = new Map();
          cache.set(tag, tagCache);
        }
        tagCache.set(url, response.data);
        if (showToast) {
          toast.success(messages?.success || "Data loaded successfully");
        }
      } catch (error) {
        setError(new Error(error?.response?.data?.message));
        if (showToast) {
          toast.error(
            messages.failure ||
              error?.response?.data?.message ||
              "An error occurred"
          );
        }
      } finally {
        setLoading(false);
        if (showToast && loading_toast) {
          toast.dismiss(loading_toast);
        }
      }
    }
  };

  const invalidateCache = (tag, showToast = true) => {
    cache.delete(tag);
    if (showToast) {
      toast.success("Cache invalidated successfully");
    }
  };

  // Modified refresh function to use last URL and tag
  const refresh = async (messages = {}) => {
    if (lastUrl) {
      // Invalidate the cache for the specific last tag and last URL
      let tagCache = cache.get(lastTag);
      if (tagCache) {
        tagCache.delete(lastUrl);
      }
      // Call getData to fetch the latest data using the last URL and tag
      await getData(lastUrl, lastTag, messages);
    }
  };

  return { data, error, loading, getData, invalidateCache, refresh };
}

export default useGet;
