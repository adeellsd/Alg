import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEnumString(str: string) {
  return str.replace(/([A-Z])/g, " $1").trim();
}

export function formatPriceValue(value: number | null, isMin: boolean) {
  if (value === null || value === 0)
    return isMin ? "Any Min Price" : "Any Max Price";
  if (value >= 1000) {
    const kValue = value / 1000;
    return isMin ? `$${kValue}k+` : `<$${kValue}k`;
  }
  return isMin ? `$${value}+` : `<$${value}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cleanParams(params: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(params).filter(
      (
        [_, value] // eslint-disable-line @typescript-eslint/no-unused-vars
      ) =>
        value !== undefined &&
        value !== "any" &&
        value !== "" &&
        (Array.isArray(value) ? value.some((v) => v !== null) : value !== null)
    )
  );
}

type MutationMessages = {
  success?: string;
  error: string;
};

export const withToast = async <T>(
  mutationFn: Promise<T>,
  messages: Partial<MutationMessages>
) => {
  const { success, error } = messages;

  try {
    const result = await mutationFn;
    if (success) toast.success(success);
    return result;
  } catch (err) {
    if (error) toast.error(error);
    throw err;
  }
};

export const createNewUserInDatabase = async (
  user: any,
  idToken: any,
  userRole: string,
  fetchWithBQ: any
) => {
  const createEndpoint =
    userRole === "Professionnel" ? "/pro" : "/particulier";

  const createUserResponse = await fetchWithBQ({
    url: createEndpoint,
    method: "POST",
    body: {
      cognitoId: user.userId,
      name: user.username,
      email: idToken?.payload?.email || "",
      phoneNumber: "",
    },
  });

  if (createUserResponse.error) {
    throw new Error("Failed to create user record");
  }

  return createUserResponse;
};

export const formatPrice = (amount: string, transactionType: string) => {
  const num = parseInt(amount);
  if (isNaN(num)) return amount;
  if (num >= 10000000) {
    return `${(num / 1000000).toFixed(1)}M DA${
      transactionType === "RENT" ? "/mois" : ""
    }`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(2)}M DA${
      transactionType === "RENT" ? "/mois" : ""
    }`;
  }
  if (num >= 1000) {
    return `${Math.round(num / 1000)}K DA${
      transactionType === "RENT" ? "/mois" : ""
    }`;
  }
  return `${num.toLocaleString("fr-DZ")} DA${
    transactionType === "RENT" ? "/mois" : ""
  }`;
};

export const getPropertyTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    APARTMENT_F2: "F2",
    APARTMENT_F3: "F3",
    APARTMENT_F4: "F4",
    APARTMENT_F5: "F5+",
    VILLA: "Villa",
    STUDIO: "Studio",
    DUPLEX: "Duplex",
    TERRAIN: "Terrain",
    LOCAL_COMMERCIAL: "Local Commercial",
  };
  return labels[type] || type;
};
