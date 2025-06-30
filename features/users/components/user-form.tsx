"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import type { UserWithPasswordType } from "../types/user-types";
import { UserFormData, userSchema } from "../schemas/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

interface UserFormProps {
  user?: UserWithPasswordType | null;
  loading?: boolean;
  onSubmit: (data: UserFormData) => void;
  error?: string | null;
  onReset?: () => void;
  onCancel?: () => void;
}

export function UserForm({
  user,
  loading,
  error,
  onSubmit,
  onCancel,
}: UserFormProps) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: user
      ? {
          full_name: user.full_name ?? "",
          password: "",
          email: user.email ?? "",
          phone: user.phone ?? "",
          role: user.role ?? "",
          admin: user.admin ?? false,
          billing: user.billing ?? false,
          bill_rate: user.bill_rate ?? null,
          cost_rate: user.cost_rate ?? null,
          avatar_initial: user.avatar_initial ?? "",
          notes: user.notes ?? "",
        }
      : {
          full_name: "",
          password: "",
          email: "",
          phone: "",
          role: "",
          admin: false,
          billing: false,
          bill_rate: null,
          cost_rate: null,
          avatar_initial: "",
          notes: "",
        },
  });

  const { control, handleSubmit, reset } = form;

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        id="user-form"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            name="full_name"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="phone"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="role"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="se">SE</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="avatar_initial"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar Initial</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    maxLength={2}
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormDescription>
                  Optional. 1-2 letters for avatar fallback.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="admin"
            control={control}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                      id="admin-checkbox"
                    />
                  </FormControl>
                  <FormLabel>Admin</FormLabel>
                </div>

                <FormDescription>Check if user is an admin.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="billing"
            control={control}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                      id="billing-checkbox"
                    />
                  </FormControl>
                  <FormLabel>Billing</FormLabel>
                </div>

                <FormDescription>
                  Check if user has billing enabled.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="bill_rate"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bill Rate</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="cost_rate"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost Rate</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="notes"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea {...field} value={field.value ?? ""} rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {error && <div className="text-red-600 font-medium">{error}</div>}
        <div className="flex gap-2 justify-end mt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            className=""
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="">
            {loading ? "Saving..." : user ? "Update User" : "Create User"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
