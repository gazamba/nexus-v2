"use client";

import React, { useEffect } from "react";
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
import { Button } from "@/components/ui/button";
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
import type { User, UserWithPassword } from "../types/user-types";
import { userSchema, userUpdateSchema } from "../schemas/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface UserFormProps {
  user?: User;
  loading?: boolean;
  onSubmit?: (data: UserWithPassword) => void;
  error?: string | null;
}

export function UserForm({ user, loading, error, onSubmit }: UserFormProps) {
  const form = useForm<UserWithPassword>({
    resolver: zodResolver(user ? userUpdateSchema : userSchema),
    defaultValues: user ?? {
      full_name: "",
      email: "",
      password: "",
      role: undefined,
      admin: false,
      billing: false,
      bill_rate: null,
      cost_rate: null,
      avatar_initial: "",
      notes: "",
    },
  });

  const { control, handleSubmit, reset } = form;

  useEffect(() => {
    reset(user || {});
  }, [user, reset]);

  const handleFormSubmit = (data: UserWithPassword) => {
    console.log(data);
    onSubmit?.(data);
    // TODO: Implement actual user update logic here
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-6"
        autoComplete="off"
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
        {/* <div className="flex gap-2 justify-end mt-4">
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
        </div> */}
      </form>
    </Form>
  );
}
