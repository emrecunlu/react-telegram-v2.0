import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MdSave } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import toast from "react-hot-toast";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useAuth } from "@/store/features/auth";
import { CreateGroupDto } from "@/types/group";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

type Props = {
  open: boolean;
  onClose: (value: boolean) => void;
};

const schema = z.object({
  name: z.string().min(3).max(25),
  file: z
    .custom<FileList>()
    .transform((file) => (file?.length > 0 ? file.item(0) : undefined))
    .refine((file) => !file || (!!file && file.size <= 1024 * 1024), {
      message: `The picture must be a maximum of 1MB.`,
    })
    .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
      message: "Only Images are allowed to be sent.",
    }),
});

export default function CreateGroupDialog({ onClose, open }: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useAuth();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      file: undefined,
    },
    mode: "onChange",
  });

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setLoading(true);
      const { name: groupName, file: photo } = values;

      const q = query(collection(db, "group"), where("name", "==", groupName));

      const groups = await getDocs(q);

      if (!groups.empty) throw new Error("Group already exists");

      const data: CreateGroupDto = {
        name: groupName,
        createdBy: {
          email: user?.email as string,
          fullname: user?.displayName as string,
          photoURL: user?.photoURL as string,
        },
        createdAt: Timestamp.now().toMillis(),
      };

      const snapshot = await addDoc(collection(db, "group"), data);

      if (photo) {
        uploadBytes(ref(storage, snapshot.id), photo).then(async (res) => {
          const photoURL = await getDownloadURL(res.ref);

          await setDoc(doc(db, snapshot.path), { photoURL }, { merge: true });
        });
      }

      toast.success("Group created successfully");
      handleClose(false);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (value: boolean) => {
    form.reset();

    onClose(value);
  };

  const fileRef = form.register("file");

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Create a New Group</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Group Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={() => (
                <FormItem>
                  <FormLabel>Photo</FormLabel>
                  <FormControl>
                    <Input type="file" {...fileRef} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="flex ml-auto"
              disabled={!form.formState.isValid || loading}
            >
              {(loading && (
                <>
                  Loading
                  <AiOutlineLoading className="animate-spin ml-2" size={18} />
                </>
              )) || (
                <>
                  Save <MdSave className="ml-2" size={18} />
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
